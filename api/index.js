/**
 * KPSS Hazırlık API Sunucusu - ÜCRETSİZ
 * OpenAI olmadan yerel soru bankası ve analiz ile çalışır
 */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const http = require('http');
const url = require('url');

const PDF_DIR = path.join(__dirname, '..', 'public', 'kpss-pdfs');
const NOTLAR_DIR = path.join(__dirname, '..', 'public', 'kpss-notlar');

function handleKpssNotlar() {
  try {
    if (!fs.existsSync(NOTLAR_DIR)) return [];
    const files = fs.readdirSync(NOTLAR_DIR).filter((f) => f.endsWith('.pdf'));
    return files.map((f) => ({
      name: f,
      url: `/kpss-notlar/${encodeURIComponent(f)}`,
    }));
  } catch {
    return [];
  }
}
const { getQuestions, getDenemeQuestions, getQuestionsBySubjectTopic } = require('./questions');

const PORT = process.env.PORT || 3001;

// 2025 KPSS güncel müfredat
const EXAM_INFO = {
  'kpss-a': {
    subjects: ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'],
  },
  'kpss-b': {
    subjects: ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'],
  },
  'kpss-ogretmenlik': {
    subjects: ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'],
  },
};

function handleAssessmentTest(body) {
  const { examType, questionCount = 10 } = body;
  return getQuestions(examType, questionCount, []);
}

function handlePracticeTest(body) {
  const { examType, weakAreas = [], questionCount = 10 } = body;
  return getQuestions(examType, questionCount, weakAreas);
}

function handleDenemeTest(body) {
  const { year, examType, questionCount = 120, sessionSeed, tier } = body;
  return getDenemeQuestions(year, examType, questionCount, sessionSeed, tier || 'normal');
}

function handleQuestionsBySubjectTopic(body) {
  const { subject, topic, examType, startFrom = 1, sessionSeed } = body;
  return getQuestionsBySubjectTopic(subject, topic, examType || 'kpss-b', startFrom, sessionSeed);
}

function handleAnalyzeResults(body) {
  const { examType, targetScore, result } = body;
  const { correctCount, totalQuestions, subjects } = result;

  const puan = Math.round((correctCount / totalQuestions) * 100);
  const hedefPuan = parseInt(targetScore.split('-')[0]) || 80;

  const weakAreas = [];
  if (subjects) {
    for (const [subj, data] of Object.entries(subjects)) {
      if (data.total > 0 && data.correct / data.total < 0.5) {
        weakAreas.push(subj);
      }
    }
  }
  if (weakAreas.length === 0 && subjects) {
    const sorted = Object.entries(subjects).sort((a, b) => {
      const rateA = a[1].total > 0 ? a[1].correct / a[1].total : 1;
      const rateB = b[1].total > 0 ? b[1].correct / b[1].total : 1;
      return rateA - rateB;
    });
    weakAreas.push(sorted[0]?.[0] || 'Türkçe');
  }

  let analysis = '';
  if (puan >= hedefPuan - 5) {
    analysis = `Tebrikler! Şu anki seviyeniz ${puan} puan civarında. Hedefiniz ${targetScore} puan olduğuna göre iyi bir başlangıç yaptınız. Zayıf alanlarınıza odaklanarak ilerleyebilirsiniz.`;
  } else if (puan >= 50) {
    analysis = `Mevcut seviyeniz ${puan} puan. Hedefiniz ${targetScore} puan için düzenli çalışma gerekiyor. Özellikle ${weakAreas.join(', ')} konularına ağırlık vermeniz faydalı olacaktır.`;
  } else {
    analysis = `Seviyeniz ${puan} puan. Hedefinize ulaşmak için temelden başlayarak sistematik bir çalışma programı izlemeniz önemli. ${weakAreas.join(', ')} alanlarını öncelikli çalışın.`;
  }

  const recommendations = [
    'Her gün en az 1-2 saat düzenli çalışma yapın.',
    'Yanlış yaptığınız soruları mutlaka inceleyin ve konuyu tekrar edin.',
    'Haftalık soru seti çözerek kendinizi test edin.',
    'Konu çalışmasından sonra mutlaka o konudan soru çözün.',
    weakAreas.length > 0 ? `${weakAreas.join(' ve ')} konularına ekstra zaman ayırın.` : 'Tüm konulara dengeli zaman ayırın.',
  ];

  return { analysis, weakAreas, recommendations };
}

function handleStudyPlan(body) {
  const { examType, targetScore, weakAreas = [] } = body;
  const hedefPuan = parseInt(targetScore.split('-')[0]) || 80;

  const allSubjects = EXAM_INFO[examType]?.subjects || ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];
  const weakList = weakAreas.length > 0 ? weakAreas : [];
  const weakExtra = weakList.length > 0 ? ` Özellikle ${weakList.join(', ')} konularına ekstra zaman ayırın.` : '';

  const weeklyPlan = `Haftalık program tüm dersleri kapsar: ${allSubjects.join(', ')}. Her gün en az 2 farklı dersten çalışın.${weakExtra} Hafta sonu: Genel tekrar ve soru seti çözümü.`;

  const dailyGoals = `Günde ${allSubjects.length} farklı ders: Her dersten konu çalışması + soru çözümü. Akşam yanlışların incelenmesi.${weakExtra}`;

  const questionTargets = hedefPuan >= 85
    ? 'Günde en az 100 soru (tüm derslerden), haftada 1 tam soru seti çözün.'
    : hedefPuan >= 75
    ? 'Günde en az 75 soru (tüm derslere dağıtın), haftada 1 soru seti çözün.'
    : 'Günde en az 50 soru (tüm dersleri kapsayacak şekilde), iki haftada bir soru seti çözün.';

  const estimatedDuration = hedefPuan >= 85 ? '3-4 ay yoğun çalışma' : hedefPuan >= 75 ? '4-6 ay düzenli çalışma' : '6-12 ay temelden çalışma';

  return {
    weeklyPlan,
    dailyGoals,
    questionTargets,
    focusAreas: allSubjects,
    estimatedDuration,
  };
}

const ROUTES = {
  'GET /': () => ({ ok: true, message: 'KPSS API çalışıyor', port: PORT }),
  'GET /api/health': () => ({ ok: true }),
  'POST /api/assessment-test': handleAssessmentTest,
  'POST /api/assessment_test': handleAssessmentTest,
  'POST /api/practice-test': handlePracticeTest,
  'POST /api/deneme-test': handleDenemeTest,
  'POST /api/questions-by-subject-topic': handleQuestionsBySubjectTopic,
  'POST /api/questions_by_subject_topic': handleQuestionsBySubjectTopic,
  'POST /api/subject-topic-questions': handleQuestionsBySubjectTopic,
  'POST /api/analyze-results': handleAnalyzeResults,
  'POST /api/study-plan': handleStudyPlan,
  'GET /api/kpss-pdfs': () => {
    try {
      const files = fs.readdirSync(PDF_DIR).filter((f) => f.endsWith('.pdf'));
      return files.map((f) => ({
        name: f,
        url: `/kpss-pdfs/${encodeURIComponent(f)}`,
      }));
    } catch {
      return [];
    }
  },
  'GET /api/kpss-notlar': handleKpssNotlar,
  'GET /api/kpss_notlar': handleKpssNotlar,
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsed = url.parse(req.url || '', true);
  const pathname = (parsed.pathname || '/').replace(/\/$/, '') || '/';
  const route = `${req.method} ${pathname}`;
  let handler = ROUTES[route];
  // Ders/konu soruları – farklı path varyasyonları
  if (!handler && req.method === 'POST' && pathname.includes('subject') && pathname.includes('topic')) {
    handler = handleQuestionsBySubjectTopic;
  }

  // PDF dosyası sun – önce dosya istekleri (liste API'sinden önce)
  if (!handler && req.method === 'GET' && pathname.startsWith('/kpss-pdfs/')) {
    const filename = decodeURIComponent(pathname.replace('/kpss-pdfs/', ''));
    if (filename && !filename.includes('..')) {
      const filePath = path.join(PDF_DIR, filename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': data.length });
        res.end(data);
        return;
      }
    }
  }
  if (!handler && req.method === 'GET' && pathname.startsWith('/kpss-notlar/')) {
    const filename = decodeURIComponent(pathname.replace('/kpss-notlar/', ''));
    if (filename && !filename.includes('..')) {
      const filePath = path.join(NOTLAR_DIR, filename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': data.length });
        res.end(data);
        return;
      }
    }
  }
  // KPSS notları liste API – sadece /api/... path'leri (dosya istekleri yukarıda)
  if (!handler && req.method === 'GET' && (pathname === '/api/kpss-notlar' || pathname === '/api/kpss_notlar')) {
    handler = handleKpssNotlar;
  }

  if (!handler) {
    console.warn('[404] İstek bulunamadı:', route);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found', path: pathname, method: req.method }));
    return;
  }

  let body = {};
  if (req.method === 'POST') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const data = Buffer.concat(chunks).toString();
    if (data) {
      try {
        body = JSON.parse(data);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Geçersiz JSON' }));
        return;
      }
    }
  }

  try {
    const result = handler(body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (err) {
    console.error('[API HATA]', err.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: err.message || 'Sunucu hatası' }));
  }
});

server.listen(PORT, () => {
  console.log(`KPSS API http://localhost:${PORT} (Ücretsiz mod)`);
});
