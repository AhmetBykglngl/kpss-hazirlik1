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
import { generateStudyPlan } from '../services/api';
import type { StudyPlan } from '../types';

interface Props {
  onBack: () => void;
  existingResult?: { analysis: string; weakAreas: string[] };
}

export default function StudyPlanScreen({ onBack, existingResult }: Props) {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(!user?.studyPlan);
  const [plan, setPlan] = useState<StudyPlan | null>(user?.studyPlan || null);

  useEffect(() => {
    if (!plan && user) {
      loadPlan();
    }
  }, []);

  const loadPlan = async () => {
    setLoading(true);
    try {
      const weakAreas = existingResult?.weakAreas || user?.weakAreas || [];
      const analysis =
        existingResult?.analysis ||
        user?.lastAnalysis ||
        (user?.lastAssessment
          ? `Puan: ${user.lastAssessment.score}, Doğru: ${user.lastAssessment.correctCount}/${user.lastAssessment.totalQuestions}. Ders bazlı: ${JSON.stringify(user.lastAssessment.subjects || {})}`
          : '');

      const p = await generateStudyPlan(
        user?.examType || 'kpss-b',
        user?.targetScore || '',
        weakAreas,
        analysis
      );
      setPlan(p);
      await updateProfile({ studyPlan: p });
    } catch (e) {
      Alert.alert('Hata', 'Çalışma programı oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !plan) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Program hazırlanıyor...</Text>
      </View>
    );
  }

  if (!plan) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Çalışma Programın</Text>
      <Text style={styles.subtitle}>Hedef: {user?.targetScore} puan</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Haftalık Plan</Text>
        <Text style={styles.sectionText}>{plan.weeklyPlan}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Günlük Hedefler</Text>
        <Text style={styles.sectionText}>{plan.dailyGoals}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soru Hedefleri</Text>
        <Text style={styles.sectionText}>{plan.questionTargets}</Text>
      </View>

      {plan.focusAreas?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Odak Alanları</Text>
          {plan.focusAreas.map((a) => (
            <View key={a} style={styles.chip}>
              <Text style={styles.chipText}>{a}</Text>
            </View>
          ))}
        </View>
      )}

      {plan.estimatedDuration && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tahmini Süre</Text>
          <Text style={styles.sectionText}>{plan.estimatedDuration}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingBottom: 48 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#94a3b8', marginTop: 16 },
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 16, color: '#94a3b8' },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc' },
  subtitle: { fontSize: 16, color: '#3b82f6', marginTop: 4, marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  chip: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  chipText: { fontSize: 14, color: '#e2e8f0' },
});
