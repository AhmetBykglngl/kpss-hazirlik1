import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LAYOUT } from '../constants/layout';
import { SUBJECTS, TOPICS_BY_SUBJECT } from '../constants/examTypes';

interface Props {
  onStart: (subject: string, topic: string, startFrom: number) => void;
  onBack: () => void;
}

type Step = 1 | 2 | 3;

export default function SoruBankasiStartScreen({ onStart, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const padding = width < 400 ? LAYOUT.spacingSm : LAYOUT.spacing;
  const contentStyle = { padding, paddingBottom: padding + insets.bottom + LAYOUT.safeBottom };
  const [step, setStep] = useState<Step>(1);
  const [subject, setSubject] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [startInput, setStartInput] = useState('1');

  const topics = subject ? (TOPICS_BY_SUBJECT[subject] || ['Tümü']) : [];

  const handleSubjectSelect = (s: string) => {
    setSubject(s);
    setTopic('');
    setStep(2);
  };

  const handleTopicSelect = (t: string) => {
    setTopic(t);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setSubject('');
      setStep(1);
    } else if (step === 3) {
      setTopic('');
      setStep(2);
    } else {
      onBack();
    }
  };

  const handleStart = () => {
    const num = parseInt(startInput || '1', 10) || 1;
    if (subject && num >= 1) {
      onStart(subject, topic || 'Tümü', num);
    }
  };

  const adjustStart = (delta: number) => {
    setStartInput((prev) => {
      const current = parseInt(prev || '1', 10) || 1;
      const next = Math.max(1, current + delta);
      return String(next);
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
      <TouchableOpacity onPress={handleBack} style={[styles.backBtn, { minHeight: LAYOUT.minTouch, justifyContent: 'center' }]} activeOpacity={0.7}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      {step === 1 && (
        <>
          <Text style={styles.title}>Ders seçin</Text>
          <Text style={styles.subtitle}>Çalışmak istediğiniz dersi seçin.</Text>
          {SUBJECTS.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.optionCard, { minHeight: LAYOUT.minTouch }]}
              onPress={() => handleSubjectSelect(s)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{s}</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.stepBadge}>{subject}</Text>
          <Text style={styles.title}>Konu seçin</Text>
          <Text style={styles.subtitle}>Seçilen dersten hangi konuyu çalışacaksınız?</Text>
          {topics.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.optionCard, { minHeight: LAYOUT.minTouch }]}
              onPress={() => handleTopicSelect(t)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{t}</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.stepBadge}>{subject} › {topic || 'Tümü'}</Text>
          <Text style={styles.title}>Kaçıncı sorudan başlamak istersiniz?</Text>
          <Text style={styles.subtitle}>Aşağıdan sayı seçin (en az 1).</Text>
          <View style={styles.stepSelectorRow}>
            <TouchableOpacity
              style={[styles.stepBtn, { minHeight: LAYOUT.minTouch }]}
              onPress={() => adjustStart(-10)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>-10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stepBtn, { minHeight: LAYOUT.minTouch }]}
              onPress={() => adjustStart(-1)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>-1</Text>
            </TouchableOpacity>
            <View style={styles.stepNumberBox}>
              <Text style={styles.stepNumberText}>{startInput}</Text>
            </View>
            <TouchableOpacity
              style={[styles.stepBtn, { minHeight: LAYOUT.minTouch }]}
              onPress={() => adjustStart(1)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stepBtn, { minHeight: LAYOUT.minTouch }]}
              onPress={() => adjustStart(10)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>+10</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.startButton, { minHeight: LAYOUT.minTouch }]} onPress={handleStart} activeOpacity={0.7}>
            <Text style={styles.startButtonText}>Başla</Text>
          </TouchableOpacity>
        </>
      )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 16, color: '#94a3b8' },
  stepBadge: { fontSize: 14, color: '#3b82f6', fontWeight: '600', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#f8fafc' },
  subtitle: { fontSize: 15, color: '#94a3b8', marginTop: 8, marginBottom: 24 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  optionText: { fontSize: 17, fontWeight: '600', color: '#f8fafc' },
  optionArrow: { fontSize: 18, color: '#64748b' },
  stepSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stepBtn: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  stepBtnText: { fontSize: 16, fontWeight: '600', color: '#e5e7eb' },
  stepNumberBox: {
    minWidth: 72,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#0b1120',
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  startButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
});
