import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { generateDenemeTest } from '../services/api';
import { markSetCompleted, getTierLabel } from '../utils/completedSets';
import { LAYOUT } from '../constants/layout';
import type { Question } from '../types';
import type { SetTier } from '../utils/completedSets';

interface Props {
  year: number;
  tier: SetTier;
  onBack: () => void;
}

export default function DenemeTestScreen({ year, tier, onBack }: Props) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showSolution, setShowSolution] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpInput, setJumpInput] = useState('');

  useEffect(() => {
    loadTest();
  }, [year, tier]);

  const loadTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = await generateDenemeTest(year, user?.examType || 'kpss-b', 120, undefined, tier);
      setQuestions(q);
      setCurrentIndex(0);
      setAnswers({});
      setShowSolution(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Soru bankası yüklenemedi');
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
      markSetCompleted(tier, year).then(onBack);
    }
  };

  const handleJumpToQuestion = () => {
    const num = parseInt(jumpInput, 10);
    if (num >= 1 && num <= questions.length) {
      setCurrentIndex(num - 1);
      setShowSolution(false);
      setShowJumpModal(false);
      setJumpInput('');
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowSolution(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Soru seti hazırlanıyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { padding: 24 }]}>
        <Text style={styles.errorTitle}>Yüklenemedi</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadTest}>
          <Text style={styles.retryBtnText}>Tekrar Dene</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Geri</Text>
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
        <Text style={styles.denemeBadge}>KPSS {year} – {getTierLabel(tier)}</Text>
        <TouchableOpacity
          onPress={() => setShowJumpModal(true)}
          style={styles.progressTouch}
        >
          <Text style={styles.progress}>
            {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.jumpHint}>Soruya git</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showJumpModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowJumpModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowJumpModal(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Soruya git</Text>
            <Text style={styles.modalSubtitle}>
              1 - {questions.length} arası numara girin
            </Text>
            <TextInput
              style={styles.jumpInput}
              placeholder={`örn. ${Math.min(50, questions.length)}`}
              placeholderTextColor="#64748b"
              keyboardType="number-pad"
              value={jumpInput}
              onChangeText={setJumpInput}
              maxLength={3}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalBtnCancel}
                onPress={() => setShowJumpModal(false)}
              >
                <Text style={styles.modalBtnCancelText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnGo}
                onPress={handleJumpToQuestion}
              >
                <Text style={styles.modalBtnGoText}>Git</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
          {q.solution ? <Text style={styles.solutionText}>{q.solution}</Text> : null}
          {q.explanation ? (
            <Text style={styles.explanationText}>{q.explanation}</Text>
          ) : null}
        </View>
      )}
      <View style={styles.navRow}>
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.prevButton} onPress={goToPrev}>
            <Text style={styles.navButtonText}>← Önceki</Text>
          </TouchableOpacity>
        )}
        {showSolution && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLast ? 'Bitir' : 'Sonraki Soru'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingBottom: 48 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#94a3b8', marginTop: 16 },
  backBtn: { marginTop: 16 },
  backBtnText: { color: '#94a3b8' },
  errorTitle: { fontSize: 20, fontWeight: '700', color: '#ef4444', marginBottom: 12 },
  errorText: { color: '#94a3b8', textAlign: 'center', marginBottom: 16 },
  retryBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryBtnText: { color: '#fff', fontWeight: '600' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  backText: { fontSize: 16, color: '#94a3b8' },
  denemeBadge: { fontSize: 14, color: '#3b82f6', fontWeight: '600' },
  progressTouch: { alignItems: 'flex-end' },
  progress: { fontSize: 16, color: '#64748b' },
  jumpHint: { fontSize: 11, color: '#475569', marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  jumpInput: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
  modalBtnCancel: { paddingVertical: 12, paddingHorizontal: 20 },
  modalBtnCancelText: { color: '#94a3b8' },
  modalBtnGo: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalBtnGoText: { color: '#fff', fontWeight: '600' },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 24, flexWrap: 'wrap' },
  prevButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    flex: 1,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: { fontSize: 16, color: '#f8fafc', fontWeight: '600' },
  subject: { fontSize: 14, color: '#3b82f6', fontWeight: '600', marginBottom: 8 },
  question: { fontSize: 18, color: '#f8fafc', lineHeight: 26, marginBottom: 20 },
  option: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: {
    backgroundColor: '#14532d',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  optionWrong: {
    backgroundColor: '#450a0a',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    justifyContent: 'center',
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
  solutionText: { fontSize: 15, color: '#cbd5e1', lineHeight: 22 },
  explanationText: { fontSize: 14, color: '#94a3b8', marginTop: 12, lineHeight: 20 },
  nextButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
  },
  nextButtonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
});
