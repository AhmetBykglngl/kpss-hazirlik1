import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LAYOUT } from '../constants/layout';
import { getKpssNotlar, getPdfFullUrl } from '../services/api';

function formatLabel(name: string): string {
  return name
    .replace('.pdf', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 50);
}

interface Props {
  onBack: () => void;
}

export default function KpssNotlarScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const padding = width < 400 ? LAYOUT.spacingSm : LAYOUT.spacing;
  const contentStyle = { padding, paddingBottom: padding + insets.bottom + LAYOUT.safeBottom };
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotlar();
  }, []);

  const loadNotlar = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getKpssNotlar();
      setPdfs(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Not listesi yüklenemedi');
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  const openPdf = (url: string) => {
    const fullUrl = getPdfFullUrl(url);
    Linking.openURL(fullUrl);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Notlar yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { padding: 24 }]}>
        <Text style={styles.errorTitle}>Yüklenemedi</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHint}>API sunucusu (npm run api) çalışıyor olmalı.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadNotlar}>
          <Text style={styles.retryBtnText}>Tekrar Dene</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Geri</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={contentStyle} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={onBack} style={[styles.backBtn, { minHeight: LAYOUT.minTouch, justifyContent: 'center' }]} activeOpacity={0.7}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>KPSS Notları</Text>
      <Text style={styles.subtitle}>
        Ders notları ve özetler. Dokununca yeni sekmede açılır.
      </Text>
      {pdfs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Henüz not eklenmemiş.</Text>
        </View>
      ) : (
        pdfs.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[styles.pdfCard, { minHeight: LAYOUT.minTouch }]}
            onPress={() => openPdf(item.url)}
            activeOpacity={0.7}
          >
            <Text style={styles.pdfIcon}>📚</Text>
            <View style={styles.pdfInfo}>
              <Text style={styles.pdfLabel}>{formatLabel(item.name)}</Text>
              <Text style={styles.pdfName}>{item.name}</Text>
            </View>
            <Text style={styles.pdfOpen}>Aç →</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#94a3b8', marginTop: 16 },
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 16, color: '#94a3b8' },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc' },
  subtitle: { fontSize: 15, color: '#94a3b8', marginTop: 8, marginBottom: 24, lineHeight: 22 },
  errorTitle: { fontSize: 20, fontWeight: '700', color: '#ef4444', marginBottom: 12 },
  errorText: { color: '#94a3b8', textAlign: 'center', marginBottom: 8 },
  errorHint: { fontSize: 13, color: '#64748b', marginBottom: 16 },
  retryBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryBtnText: { color: '#fff', fontWeight: '600' },
  empty: { padding: 32, alignItems: 'center' },
  emptyText: { color: '#64748b' },
  pdfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  pdfIcon: { fontSize: 28, marginRight: 16 },
  pdfInfo: { flex: 1 },
  pdfLabel: { fontSize: 16, fontWeight: '700', color: '#f8fafc' },
  pdfName: { fontSize: 12, color: '#64748b', marginTop: 4 },
  pdfOpen: { fontSize: 14, color: '#3b82f6', fontWeight: '600' },
});
