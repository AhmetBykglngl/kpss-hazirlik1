import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { generateAssessmentTest } from '../services/api';
import type { Question, TestResult, AnswerResult } from '../types';

interface Props {
  onComplete: (result: TestResult) => void;
  onBack: () => void;
}

export default function AssessmentTestScreen({ onComplete, onBack }: Props) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showSolution, setShowSolution] = useState(false);
  const [solving, setSolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = await generateAssessmentTest(user?.examType || 'kpss-b', 10);
      if (!q || q.length === 0) throw new Error('Test oluşturulamadı');
      setQuestions(q);
      setCurrentIndex(0);
      setAnswers({});
      setShowSolution(false);
    } catch (e) {
      let msg = e instanceof Error ? e.message : 'Bilinmeyen hata';
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed')) {
        msg = 'Sunucuya bağlanılamadı. API sunucusu çalışıyor mu? (npm run api)';
      }
      setError(msg);
      console.error('Test yükleme hatası:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (qId: string, optionIndex: number) => {
    if (showSolution) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
    setShowSolution(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowSolution(false);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setSolving(true);
    const answerResults: AnswerResult[] = questions.map((q) => {
      const selected = answers[q.id] ?? -1;
      const isCorrect = selected === q.correctAnswer;
      return {
        questionId: q.id,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        question: q.question,
        solution: q.solution,
        explanation: q.explanation,
      };
    });

    const subjects: Record<string, { correct: number; total: number }> = {};
    answerResults.forEach((ar) => {
      const q = questions.find((x) => x.id === ar.questionId);
      const subj = q?.subject || 'Genel';
      if (!subjects[subj]) subjects[subj] = { correct: 0, total: 0 };
      subjects[subj].total++;
      if (ar.isCorrect) subjects[subj].correct++;
    });

    const correctCount = answerResults.filter((r) => r.isCorrect).length;
    const total = questions.length;
    const result: TestResult = {
      totalQuestions: total,
      correctCount,
      wrongCount: total - correctCount - (total - Object.keys(answers).length),
      emptyCount: total - Object.keys(answers).length,
      score: Math.round((correctCount / total) * 100),
      answers: answerResults,
      subjects,
    };
    onComplete(result);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Test hazırlanıyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { padding: 24 }]}>
        <Text style={styles.errorTitle}>Test Yüklenemedi</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHint}>
          API sunucusu çalışıyor mu? (npm run api){'\n'}
          http://localhost:3002
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTest}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButtonAlt} onPress={onBack}>
          <Text style={styles.backButtonAltText}>← Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!questions.length) return null;

  const q = questions[currentIndex];
  const selected = answers[q.id];
  const isLast = currentIndex === questions.length - 1;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>

      <Text style={styles.subject}>{q.subject}</Text>
      <Text style={styles.question}>{q.question}</Text>

      {q.options.map((opt, i) => {
        let optStyle = styles.option;
        if (selected === i) {
          optStyle = i === q.correctAnswer ? styles.optionCorrect : styles.optionWrong;
        } else if (showSolution && i === q.correctAnswer) {
          optStyle = styles.optionCorrect;
        }
        return (
          <TouchableOpacity
            key={i}
            style={optStyle}
            onPress={() => handleSelectAnswer(q.id, i)}
            disabled={showSolution}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {showSolution && (
        <View style={styles.solutionBox}>
          <Text style={styles.solutionTitle}>
            {selected === q.correctAnswer ? '✓ Doğru' : '✗ Yanlış'}
          </Text>
          {q.solution ? (
            <Text style={styles.solutionText}>{q.solution}</Text>
          ) : null}
          {q.explanation ? (
            <Text style={styles.explanationText}>{q.explanation}</Text>
          ) : null}
        </View>
      )}

      {showSolution && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Sonuçları Gör' : 'Sonraki Soru'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingBottom: 48 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#94a3b8', marginTop: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  backText: { fontSize: 16, color: '#94a3b8' },
  progress: { fontSize: 16, color: '#64748b' },
  subject: { fontSize: 14, color: '#3b82f6', fontWeight: '600', marginBottom: 8 },
  question: { fontSize: 18, color: '#f8fafc', lineHeight: 26, marginBottom: 20 },
  option: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: {
    backgroundColor: '#14532d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  optionWrong: {
    backgroundColor: '#450a0a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  optionText: { fontSize: 15, color: '#f8fafc' },
  solutionBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  solutionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 12,
  },
  solutionText: { fontSize: 15, color: '#cbd5e1', lineHeight: 22 },
  explanationText: { fontSize: 14, color: '#94a3b8', marginTop: 12, lineHeight: 20 },
  nextButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
  errorTitle: { fontSize: 22, fontWeight: '700', color: '#ef4444', marginBottom: 12 },
  errorText: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 16 },
  errorHint: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  retryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  retryButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  backButtonAlt: { padding: 16 },
  backButtonAltText: { fontSize: 16, color: '#94a3b8' },
});
