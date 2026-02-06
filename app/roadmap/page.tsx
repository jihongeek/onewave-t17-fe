'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RoadmapForm } from '@/components/roadmap/roadmap-form';
import { RoadmapResult } from '@/components/roadmap/roadmap-result';
import { useAuth } from '@/lib/auth';
import { useAuthModal } from '@/components/auth-modal';
import {
  getRoadmapByCase,
  createRoadmap,
  getRoadmap,
  type Roadmap,
  type RoadmapFormData,
} from '@/lib/roadmap';
import { Loader2 } from 'lucide-react';

function RoadmapPageContent() {
  const { isLoggedIn, isLoading } = useAuth();
  const { openModal } = useAuthModal();
  const promptedRef = useRef(false);
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get('id');

  const [step, setStep] = useState<'form' | 'result' | 'loading'>('form');
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [formData, setFormData] = useState<RoadmapFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // 로그인 확인
  useEffect(() => {
    if (promptedRef.current || isLoading) return;
    if (!isLoggedIn) {
      promptedRef.current = true;
      openModal();
    }
  }, [isLoggedIn, isLoading, openModal]);

  // URL에 id 파라미터가 있으면 저장된 로드맵 불러오기
  useEffect(() => {
    if (!roadmapId) return;

    const loadSavedRoadmap = async () => {
      setStep('loading');
      setLoadError(null);
      try {
        const savedRoadmap = await getRoadmap(Number(roadmapId));
        // 저장된 로드맵 정보로 formData와 roadmap 생성
        const loadedFormData: RoadmapFormData = {
          teamSize: savedRoadmap.teamSize as RoadmapFormData['teamSize'],
          budget: savedRoadmap.budget as RoadmapFormData['budget'],
          period: savedRoadmap.timeline as RoadmapFormData['period'],
          priority: savedRoadmap.priority as RoadmapFormData['priority'],
        };
        const generatedRoadmap = getRoadmapByCase(loadedFormData);
        setFormData(loadedFormData);
        setRoadmap(generatedRoadmap);
        setStep('result');
        setIsSaved(true); // 이미 저장된 로드맵이므로
      } catch (err) {
        setLoadError(
          err instanceof Error
            ? err.message
            : '로드맵을 불러오는데 실패했습니다.'
        );
        setStep('form');
      }
    };

    loadSavedRoadmap();
  }, [roadmapId]);

  // 폼 제출 처리
  const handleFormSubmit = (data: RoadmapFormData) => {
    const generatedRoadmap = getRoadmapByCase(data);
    setFormData(data);
    setRoadmap(generatedRoadmap);
    setStep('result');
    setIsSaved(false);
    setSaveError(null);
  };

  // 다시 시작
  const handleReset = () => {
    setStep('form');
    setRoadmap(null);
    setFormData(null);
    setIsSaved(false);
    setSaveError(null);
  };

  // 로드맵 저장 (API 호출)
  const handleSave = async () => {
    if (!formData) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await createRoadmap({
        teamSize: formData.teamSize,
        budget: formData.budget,
        timeline: formData.period, // API에서는 timeline으로 사용
        priority: formData.priority,
      });
      setIsSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          {step === 'loading' ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">
                로드맵을 불러오는 중...
              </p>
            </div>
          ) : step === 'form' ? (
            <div className="space-y-8">
              {loadError && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                  {loadError}
                </div>
              )}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  맞춤형 실행 로드맵
                </h1>
                <p className="mt-2 text-muted-foreground">
                  당신의 상황에 맞는 단계별 실행 계획을 만들어 드립니다
                </p>
              </div>
              <RoadmapForm onSubmit={handleFormSubmit} />
            </div>
          ) : roadmap && formData ? (
            <>
              {saveError && (
                <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                  {saveError}
                </div>
              )}
              <RoadmapResult
                roadmap={roadmap}
                formData={formData}
                onReset={handleReset}
                onSave={handleSave}
                isSaving={isSaving}
                isSaved={isSaved}
              />
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex flex-1 items-center justify-center bg-secondary">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </main>
          <Footer />
        </div>
      }
    >
      <RoadmapPageContent />
    </Suspense>
  );
}
