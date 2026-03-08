import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { EXAM_TYPES, TARGET_OPTIONS, EDUCATION_LEVELS } from '../constants/examTypes';
import type { ExamType, EducationLevel } from '../constants/examTypes';

interface Props {
  onComplete: (name: string, educationLevel: EducationLevel, examType: ExamType, targetScore: string) => void;
}

export default function WelcomeScreen({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(null);
  const [examType, setExamType] = useState<ExamType | null>(null);
  const [targetScore, setTargetScore] = useState('');

  const handleFinish = () => {
    if (name.trim() && educationLevel && examType && targetScore) {
      onComplete(name.trim(), educationLevel, examType, targetScore);
    }
  };

  useEffect(() => {
    if (step === 3 && (educationLevel === 'ortaogretim' || educationLevel === 'onlisans')) {
      setExamType('kpss-b');
    }
  }, [step, educationLevel]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>KPSS Hazırlık</Text>
      <Text style={styles.subtitle}>Hedefine ulaşmana yardımcı olacağız</Text>

      {step === 1 && (
        <>
          <Text style={styles.label}>Adın Soyadın</Text>
          <TextInput
            style={styles.input}
            placeholder="Adını yaz"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={[styles.button, !name.trim() && styles.buttonDisabled]}
            onPress={() => name.trim() && setStep(2)}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>Devam Et</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>Öğrenim durumun?</Text>
          {EDUCATION_LEVELS.map((edu) => (
            <TouchableOpacity
              key={edu.id}
              style={[styles.card, educationLevel === edu.id && styles.cardSelected]}
              onPress={() => setEducationLevel(edu.id)}
            >
              <Text style={styles.cardTitle}>{edu.name}</Text>
              <Text style={styles.cardDesc}>{edu.description}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => setStep(1)}>
              <Text style={styles.buttonSecondaryText}>Geri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !educationLevel && styles.buttonDisabled]}
              onPress={() => educationLevel && setStep(3)}
              disabled={!educationLevel}
            >
              <Text style={styles.buttonText}>Devam Et</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Hangi KPSS sınavına gireceksin?</Text>
          {(educationLevel === 'ortaogretim' || educationLevel === 'onlisans'
            ? EXAM_TYPES.filter((e) => e.id === 'kpss-b')
            : EXAM_TYPES
          ).map((exam) => (
            <TouchableOpacity
              key={exam.id}
              style={[styles.card, examType === exam.id && styles.cardSelected]}
              onPress={() => setExamType(exam.id)}
            >
              <Text style={styles.cardTitle}>{exam.name}</Text>
              <Text style={styles.cardDesc}>{exam.description}</Text>
            </TouchableOpacity>
          ))}
          {educationLevel === 'ortaogretim' && (
            <Text style={styles.hint}>Ortaöğretim mezunları sadece KPSS B Grubu\'na başvurabilir.</Text>
          )}
          {educationLevel === 'onlisans' && (
            <Text style={styles.hint}>Önlisans mezunları KPSS B Grubu memur kadrolarına başvurabilir.</Text>
          )}
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => setStep(2)}>
              <Text style={styles.buttonSecondaryText}>Geri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !examType && styles.buttonDisabled]}
              onPress={() => examType && setStep(4)}
              disabled={!examType}
            >
              <Text style={styles.buttonText}>Devam Et</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.label}>Hedeflediğin puan aralığı?</Text>
          {TARGET_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.card, targetScore === opt.id && styles.cardSelected]}
              onPress={() => setTargetScore(opt.id)}
            >
              <Text style={styles.cardTitle}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => setStep(3)}>
              <Text style={styles.buttonSecondaryText}>Geri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !targetScore && styles.buttonDisabled]}
              onPress={handleFinish}
              disabled={!targetScore}
            >
              <Text style={styles.buttonText}>Başla</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingBottom: 48 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
    marginTop: 48,
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 32 },
  label: { fontSize: 18, fontWeight: '600', color: '#e2e8f0', marginBottom: 16 },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: { borderColor: '#3b82f6' },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#f8fafc' },
  cardDesc: { fontSize: 14, color: '#94a3b8', marginTop: 6 },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
  buttonSecondary: {
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  buttonSecondaryText: { fontSize: 16, color: '#94a3b8' },
  row: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  hint: { fontSize: 13, color: '#64748b', marginTop: 8, marginBottom: 4 },
});
