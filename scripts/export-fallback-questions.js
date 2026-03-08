/**
 * API'deki ilk 120 soruyu fallback JSON olarak dışa aktarır.
 * Çalıştırma: node scripts/export-fallback-questions.js (proje kökünden)
 */
const path = require('path');
const fs = require('fs');

const { QUESTIONS_BANK } = require('../api/questions.js');
const want = 120;
// 120 soru: bank yetmezse baştan tekrarla
let pool = [];
while (pool.length < want) {
  pool = pool.concat(QUESTIONS_BANK.map((q) => ({ ...q })));
}
const out = pool.slice(0, want).map((q, i) => ({
  id: `fb-${i + 1}`,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  subject: q.subject,
  solution: q.solution || '',
  explanation: q.explanation || '',
}));

const outPath = path.join(__dirname, '..', 'src', 'data', 'questionsFallback120.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log('Yazıldı:', outPath, '(' + out.length + ' soru)');
