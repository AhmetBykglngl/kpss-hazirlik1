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
import { analyzeResults } from '../services/api';
import type { TestResult } from '../types';

interface Props {
  result: TestResult;
  onBack: () => void;
  onGeneratePlan: () => void;
}

export default function ResultsScreen({
  result,
  onBack,
  onGeneratePlan,
}: Props) {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string>('');
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      const res = await analyzeResults(
        user?.examType || 'kpss-b',
        user?.targetScore || '',
        result
      );
      setAnalysis(res.analysis);
      setWeakAreas(res.weakAreas);
      setRecommendations(res.recommendations);
      await updateProfile({
        lastAssessment: result,
        weakAreas: res.weakAreas,
        lastAnalysis: res.analysis,
      });
    } catch (e) {
      Alert.alert('Hata', 'Analiz yüklenemedi. API sunucusunu kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Analiz ediliyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Puanın</Text>
        <Text style={styles.scoreValue}>{result.score}</Text>
        <Text style={styles.scoreDetail}>
          {result.correctCount} doğru / {result.totalQuestions} soru
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Durum Analizi</Text>
      <Text style={styles.analysisText}>{analysis}</Text>

      {weakAreas.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Zayıf Alanlar</Text>
          <View style={styles.chipRow}>
            {weakAreas.map((a) => (
              <View key={a} style={styles.chip}>
                <Text style={styles.chipText}>{a}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {recommendations.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Öneriler</Text>
          {recommendations.map((r, i) => (
            <View key={i} style={styles.recommendationItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.recommendationText}>{r}</Text>
            </View>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.planButton} onPress={onGeneratePlan}>
        <Text style={styles.planButtonText}>Çalışma Programı Oluştur</Text>
      </TouchableOpacity>
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
  scoreCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: { fontSize: 14, color: '#94a3b8' },
  scoreValue: { fontSize: 48, fontWeight: '800', color: '#3b82f6' },
  scoreDetail: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginTop: 24,
    marginBottom: 12,
  },
  analysisText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#334155',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: { fontSize: 14, color: '#e2e8f0' },
  recommendationItem: { flexDirection: 'row', marginBottom: 8 },
  bullet: { color: '#3b82f6', marginRight: 8, fontSize: 16 },
  recommendationText: { flex: 1, fontSize: 15, color: '#cbd5e1', lineHeight: 22 },
  planButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
  },
  planButtonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
});
