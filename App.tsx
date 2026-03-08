import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import AssessmentTestScreen from './src/screens/AssessmentTestScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import StudyPlanScreen from './src/screens/StudyPlanScreen';
import PracticeTestScreen from './src/screens/PracticeTestScreen';
import DenemelerScreen from './src/screens/DenemelerScreen';
import DenemeTestScreen from './src/screens/DenemeTestScreen';
import SoruBankasiStartScreen from './src/screens/SoruBankasiStartScreen';
import SubjectTopicTestScreen from './src/screens/SubjectTopicTestScreen';
import PdfDocumentsScreen from './src/screens/PdfDocumentsScreen';
import KpssNotlarScreen from './src/screens/KpssNotlarScreen';
import type { ExamType, EducationLevel } from './src/constants/examTypes';
import type { TestResult } from './src/types';
import type { SetTier } from './src/utils/completedSets';

type Screen =
  | 'welcome'
  | 'home'
  | 'assessment'
  | 'results'
  | 'studyPlan'
  | 'practice'
  | 'denemeler'
  | 'denemeTest'
  | 'soruBankasiStart'
  | 'subjectTopicTest'
  | 'pdfDocs'
  | 'kpssNotlar';

function AppContent() {
  const { user, isLoading, login } = useAuth();
  const insets = useSafeAreaInsets();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [selectedDenemeYear, setSelectedDenemeYear] = useState<number | null>(null);
  const [selectedDenemeTier, setSelectedDenemeTier] = useState<SetTier>('normal');
  const [subjectTopicParams, setSubjectTopicParams] = useState<{
    subject: string;
    topic: string;
    startFrom: number;
  } | null>(null);
  const [resultsAnalysis, setResultsAnalysis] = useState<{
    analysis: string;
    weakAreas: string[];
  } | null>(null);

  useEffect(() => {
    if (user && screen === 'welcome') setScreen('home');
  }, [user, screen]);

  const handleLogin = (name: string, educationLevel: EducationLevel, examType: ExamType, targetScore: string) => {
    login(name, educationLevel, examType, targetScore);
    setScreen('home');
  };

  const handleAssessmentComplete = (result: TestResult) => {
    setLastResult(result);
    setScreen('results');
  };

  const handleGeneratePlan = () => {
    setResultsAnalysis(null);
    setScreen('studyPlan');
  };

  const currentResult = lastResult || user?.lastAssessment;

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]} edges={['top']}>
      <StatusBar style="light" />
      {!user ? (
        <WelcomeScreen onComplete={handleLogin} />
      ) : screen === 'home' ? (
        <HomeScreen
          onStartAssessment={() => setScreen('assessment')}
          onStartPractice={() => setScreen('practice')}
          onViewStudyPlan={() => setScreen('studyPlan')}
          onViewResults={() => currentResult && setScreen('results')}
          onOpenDenemeler={() => setScreen('denemeler')}
          onOpenPdfDocs={() => setScreen('pdfDocs')}
          onOpenKpssNotlar={() => setScreen('kpssNotlar')}
        />
      ) : screen === 'assessment' ? (
        <AssessmentTestScreen
          onComplete={handleAssessmentComplete}
          onBack={() => setScreen('home')}
        />
      ) : screen === 'results' && currentResult ? (
        <ResultsScreen
          result={currentResult}
          onBack={() => setScreen('home')}
          onGeneratePlan={handleGeneratePlan}
        />
      ) : screen === 'studyPlan' ? (
        <StudyPlanScreen
          onBack={() => setScreen('home')}
          existingResult={resultsAnalysis || undefined}
        />
      ) : screen === 'practice' ? (
        <PracticeTestScreen onBack={() => setScreen('home')} />
      ) : screen === 'denemeler' ? (
        <DenemelerScreen
          onSelectDeneme={(year, tier) => {
            setSelectedDenemeYear(year);
            setSelectedDenemeTier(tier);
            setScreen('denemeTest');
          }}
          onSelectSubjectTopic={() => setScreen('soruBankasiStart')}
          onBack={() => setScreen('home')}
        />
      ) : screen === 'denemeTest' && selectedDenemeYear ? (
        <DenemeTestScreen
          year={selectedDenemeYear}
          tier={selectedDenemeTier}
          onBack={() => {
            setSelectedDenemeYear(null);
            setScreen('denemeler');
          }}
        />
      ) : screen === 'soruBankasiStart' ? (
        <SoruBankasiStartScreen
          onStart={(subject, topic, startFrom) => {
            setSubjectTopicParams({ subject, topic, startFrom });
            setScreen('subjectTopicTest');
          }}
          onBack={() => setScreen('denemeler')}
        />
      ) : screen === 'subjectTopicTest' && subjectTopicParams ? (
        <SubjectTopicTestScreen
          subject={subjectTopicParams.subject}
          topic={subjectTopicParams.topic}
          startFrom={subjectTopicParams.startFrom}
          onBack={() => {
            setSubjectTopicParams(null);
            setScreen('soruBankasiStart');
          }}
        />
      ) : screen === 'pdfDocs' ? (
        <PdfDocumentsScreen onBack={() => setScreen('home')} />
      ) : screen === 'kpssNotlar' ? (
        <KpssNotlarScreen onBack={() => setScreen('home')} />
      ) : (
        <HomeScreen
          onStartAssessment={() => setScreen('assessment')}
          onStartPractice={() => setScreen('practice')}
          onViewStudyPlan={() => setScreen('studyPlan')}
          onViewResults={() => currentResult && setScreen('results')}
          onOpenDenemeler={() => setScreen('denemeler')}
          onOpenPdfDocs={() => setScreen('pdfDocs')}
          onOpenKpssNotlar={() => setScreen('kpssNotlar')}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    ...(Platform.OS === 'web' && {
      minHeight: '100vh',
      minHeight: '100dvh',
    }),
  },
});
