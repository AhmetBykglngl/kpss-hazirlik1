import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { LAYOUT } from '../constants/layout';
import { EXAM_TYPES } from '../constants/examTypes';

interface Props {
  onStartAssessment: () => void;
  onStartPractice: () => void;
  onViewStudyPlan: () => void;
  onViewResults: () => void;
  onOpenDenemeler: () => void;
  onOpenPdfDocs: () => void;
  onOpenKpssNotlar: () => void;
}

export default function HomeScreen({
  onStartAssessment,
  onStartPractice,
  onViewStudyPlan,
  onViewResults,
  onOpenDenemeler,
  onOpenPdfDocs,
  onOpenKpssNotlar,
}: Props) {
  const { user, logout } = useAuth();
  const exam = EXAM_TYPES.find((e) => e.id === user?.examType);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isNarrow = width < 400;
  const padding = isNarrow ? LAYOUT.spacingSm : LAYOUT.spacing;
  const contentStyle = { padding, paddingBottom: padding + insets.bottom + LAYOUT.safeBottom };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={[styles.container, Platform.OS === 'web' && styles.containerWeb]}
        contentContainerStyle={[contentStyle, styles.contentContainer]}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba, {user?.name}</Text>
          <Text style={styles.exam}>{exam?.name || user?.examType}</Text>
          {user?.educationLevel ? (
            <Text style={styles.eduLevel}>
              {user.educationLevel === 'ortaogretim' ? 'Ortaöğretim' : user.educationLevel === 'onlisans' ? 'Önlisans' : 'Lisans'}
            </Text>
          ) : null}
          <Text style={styles.target}>Hedef: {user?.targetScore} puan</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      {!user?.lastAssessment ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seviye Belirleme Testi</Text>
          <Text style={styles.cardDesc}>
            Önce mevcut seviyeni öğrenmemiz gerekiyor. Kısa bir test çöz, sana özel analiz ve çalışma programı hazırlayalım.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onStartAssessment}>
            <Text style={styles.primaryButtonText}>Teste Başla</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Seviye Analizim</Text>
            <Text style={styles.cardDesc}>
              {user.lastAssessment.correctCount}/{user.lastAssessment.totalQuestions} doğru
            </Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={onViewResults}>
              <Text style={styles.secondaryButtonText}>Detayları Gör</Text>
            </TouchableOpacity>
          </View>

          {user.studyPlan ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Çalışma Programım</Text>
              <Text style={styles.cardDesc}>
                {user.studyPlan.dailyGoals?.slice(0, 80)}...
              </Text>
              <TouchableOpacity style={styles.secondaryButton} onPress={onViewStudyPlan}>
                <Text style={styles.secondaryButtonText}>Programa Git</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pratik Test</Text>
            <Text style={styles.cardDesc}>
              Eksik alanlarına yönelik öğretici test. Doğru ve yanlış tüm cevapların çözümünü göreceksin.
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={onStartPractice}>
              <Text style={styles.primaryButtonText}>Test Çöz</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Soru Bankası</Text>
        <Text style={styles.cardDesc}>
          {user?.lastAssessment
            ? '2025, 2024, 2023... tüm yılların soru setleri. Her yıl farklı dağılım.'
            : '2019-2025 arası soru setleri. Seviye testinden bağımsız çözebilirsin.'}
        </Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={onOpenDenemeler}>
          <Text style={styles.secondaryButtonText}>Soru Bankasına Git</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>KPSS Notları</Text>
        <Text style={styles.cardDesc}>
          KPSS ders notları ve özetleri. Ramazan Yetgin Tarih Notları dahil.
        </Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={onOpenKpssNotlar}>
          <Text style={styles.secondaryButtonText}>Notlara Git</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Çıkmış Sorular (PDF)</Text>
        <Text style={styles.cardDesc}>
          2006, 2008, 2012-2020 KPSS Önlisans sınav soruları ve cevap anahtarları. Dokunarak açabilirsiniz.
        </Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={onOpenPdfDocs}>
          <Text style={styles.secondaryButtonText}>{`PDF'lere Git`}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, minHeight: 0 },
  container: { flex: 1, backgroundColor: '#0f172a' },
  containerWeb: {
    flex: 1,
    overflow: 'auto' as const,
    WebkitOverflowScrolling: 'touch' as const,
  },
  contentContainer: { flexGrow: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  greeting: { fontSize: 24, fontWeight: '700', color: '#f8fafc' },
  exam: { fontSize: 16, color: '#3b82f6', marginTop: 4 },
  eduLevel: { fontSize: 14, color: '#64748b', marginTop: 2 },
  target: { fontSize: 14, color: '#94a3b8', marginTop: 2 },
  logoutBtn: { padding: 8 },
  logoutText: { fontSize: 14, color: '#94a3b8' },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  cardDesc: { fontSize: 15, color: '#94a3b8', marginTop: 12, lineHeight: 22 },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: { fontSize: 17, fontWeight: '600', color: '#fff' },
  secondaryButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    minHeight: LAYOUT.minTouch,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  secondaryButtonText: { fontSize: 16, fontWeight: '600', color: '#f8fafc' },
});
