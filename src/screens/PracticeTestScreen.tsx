import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { generatePracticeTest } from '../services/api';
import type { Question } from '../types';

interface Props {
  onBack: () => void;
}

export default function PracticeTestScreen({ onBack }: Props) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    setLoading(true);
    try {
      const weakAreas = user?.weakAreas || [];
      const q = await generatePracticeTest(
        user?.examType || 'kpss-b',
        weakAreas,
        10
      );
      setQuestions(q);
      setCurrentIndex(0);
      setAnswers({});
      setShowSolution(false);
    } catch (e) {
      Alert.alert('Bağlantı Hatası', 'API sunucusuna bağlanılamadı.');
      onBack();
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
      onBack();
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Test hazırlanıyor...</Text>
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
          <Text style={styles.solutionLabel}>Çözüm:</Text>
          <Text style={styles.solutionText}>{q.solution || 'Açıklama yok.'}</Text>
          <Text style={styles.explanationLabel}>Açıklama:</Text>
          <Text style={styles.explanationText}>
            {q.explanation || 'Eksik bilgi.'}
          </Text>
        </View>
      )}

      {showSolution && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Bitir' : 'Sonraki Soru'}
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
  solutionTitle: { fontSize: 16, fontWeight: '700', color: '#f8fafc', marginBottom: 12 },
  solutionLabel: { fontSize: 14, fontWeight: '600', color: '#94a3b8', marginBottom: 4 },
  solutionText: { fontSize: 15, color: '#cbd5e1', lineHeight: 22 },
  explanationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginTop: 12,
    marginBottom: 4,
  },
  explanationText: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
  nextButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
});
