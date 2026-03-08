import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { DENEME_YEARS } from '../constants/examTypes';
import {
  getCompletedSets,
  isTierUnlocked,
  getTierLabel,
  type SetTier,
} from '../utils/completedSets';

interface Props {
  onSelectDeneme: (year: number, tier: SetTier) => void;
  onSelectSubjectTopic: () => void;
  onBack: () => void;
}

const TIERS: SetTier[] = ['normal', 'zor', 'cokZor'];

export default function DenemelerScreen({ onSelectDeneme, onSelectSubjectTopic, onBack }: Props) {
  const [completed, setCompleted] = useState<Record<SetTier, string[]>>({
    normal: [],
    zor: [],
    cokZor: [],
  });

  useEffect(() => {
    getCompletedSets().then(setCompleted);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Soru Bankası</Text>
      <Text style={styles.subtitle}>
        Ders ve konu seçerek veya yıllara göre çalışın. Setleri tamamladıkça zor seviyeler açılır.
      </Text>

      <TouchableOpacity
        style={[styles.denemeCard, styles.subjectTopicCard]}
        onPress={onSelectSubjectTopic}
        activeOpacity={0.8}
      >
        <Text style={styles.yearText}>Ders + Konu</Text>
        <Text style={styles.denemeLabel}>Ders ve Konu Seçerek Çalış</Text>
        <Text style={styles.denemeDesc}>Ders seç → Konu seç → Kaçıncı sorudan başlayacağını belirle</Text>
      </TouchableOpacity>

      {TIERS.map((tier) => {
        const unlocked = isTierUnlocked(tier, completed);
        const tierCompleted = completed[tier] || [];
        return (
          <View key={tier} style={styles.tierSection}>
            <View style={styles.tierHeader}>
              <Text style={[styles.sectionTitle, !unlocked && styles.lockedText]}>
                {getTierLabel(tier)} Setler {!unlocked && `(${tier === 'zor' ? '7 standart set tamamla' : '7 zor set tamamla'})`}
              </Text>
              {unlocked && (
                <Text style={styles.progressText}>
                  {tierCompleted.length}/7 tamamlandı
                </Text>
              )}
            </View>
            {DENEME_YEARS.map((year) => {
              const isDone = tierCompleted.includes(String(year));
              const disabled = !unlocked;
              return (
                <TouchableOpacity
                  key={`${tier}-${year}`}
                  style={[
                    styles.denemeCard,
                    isDone && styles.denemeCardDone,
                    disabled && styles.denemeCardDisabled,
                  ]}
                  onPress={() => !disabled && onSelectDeneme(year, tier)}
                  activeOpacity={disabled ? 1 : 0.8}
                  disabled={disabled}
                >
                  <Text style={styles.yearText}>{year}</Text>
                  <Text style={styles.denemeLabel}>
                    KPSS {year} {getTierLabel(tier)}
                    {isDone && ' ✓'}
                  </Text>
                  <Text style={styles.denemeDesc}>120 soru (ÖSYM dağılımı)</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingBottom: 48 },
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 16, color: '#94a3b8' },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc' },
  subtitle: { fontSize: 15, color: '#94a3b8', marginTop: 8, marginBottom: 24 },
  subjectTopicCard: { borderLeftColor: '#22c55e' },
  tierSection: { marginTop: 24 },
  tierHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#64748b' },
  lockedText: { color: '#475569', fontStyle: 'italic' },
  progressText: { fontSize: 13, color: '#22c55e' },
  denemeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  yearText: { fontSize: 14, color: '#3b82f6', fontWeight: '600', marginBottom: 4 },
  denemeLabel: { fontSize: 18, fontWeight: '700', color: '#f8fafc' },
  denemeDesc: { fontSize: 14, color: '#94a3b8', marginTop: 6 },
  denemeCardDone: { borderLeftColor: '#22c55e', opacity: 0.9 },
  denemeCardDisabled: { opacity: 0.5 },
});
