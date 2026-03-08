import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { getKpssPdfs, getPdfFullUrl } from '../services/api';

// Dosya adından okunaklı etiket üret
function formatLabel(name: string): string {
  const n = name.replace('.pdf', '').toLowerCase();
  const yearMatch = n.match(/20\d{2}|19\d{2}/);
  const year = yearMatch ? yearMatch[0] : '';
  if (n.includes('cevap') || n.includes('anahtar')) {
    return year ? `${year} Cevap Anahtarı` : 'Cevap Anahtarı';
  }
  if (n.includes('genyet') || n.includes('gen yet')) {
    return year ? `${year} Genel Yetenek` : 'Genel Yetenek';
  }
  if (n.includes('genkul') || n.includes('gen kul')) {
    return year ? `${year} Genel Kültür` : 'Genel Kültür';
  }
  if (year || n.includes('kpss') || n.includes('onlis')) {
    return year ? `${year} KPSS Önlisans` : 'KPSS Önlisans';
  }
  return name.replace('.pdf', '').slice(0, 40);
}

interface Props {
  onBack: () => void;
}

export default function PdfDocumentsScreen({ onBack }: Props) {
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPdfs();
  }, []);

  const loadPdfs = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getKpssPdfs();
      setPdfs(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'PDF listesi yüklenemedi');
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
        <Text style={styles.loadingText}>PDF listesi yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { padding: 24 }]}>
        <Text style={styles.errorTitle}>Yüklenemedi</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHint}>API sunucusu (npm run api) çalışıyor olmalı.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadPdfs}>
          <Text style={styles.retryBtnText}>Tekrar Dene</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← Geri</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sorted = [...pdfs].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Çıkmış Sorular (PDF)</Text>
      <Text style={styles.subtitle}>
        KPSS Önlisans çıkmış sınav soruları ve cevap anahtarları. Dokununca yeni sekmede açılır.
      </Text>
      {sorted.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Henüz PDF bulunamadı.</Text>
        </View>
      ) : (
        sorted.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.pdfCard}
            onPress={() => openPdf(item.url)}
            activeOpacity={0.8}
          >
            <Text style={styles.pdfIcon}>📄</Text>
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
  content: { padding: 24, paddingBottom: 48 },
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
    borderLeftColor: '#3b82f6',
  },
  pdfIcon: { fontSize: 28, marginRight: 16 },
  pdfInfo: { flex: 1 },
  pdfLabel: { fontSize: 16, fontWeight: '700', color: '#f8fafc' },
  pdfName: { fontSize: 12, color: '#64748b', marginTop: 4 },
  pdfOpen: { fontSize: 14, color: '#3b82f6', fontWeight: '600' },
});
