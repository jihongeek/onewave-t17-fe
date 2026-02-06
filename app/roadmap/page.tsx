'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RoadmapForm } from '@/components/roadmap/roadmap-form';
import { RoadmapResult } from '@/components/roadmap/roadmap-result';
import { useAuth } from '@/lib/auth';
import { useAuthModal } from '@/components/auth-modal';
import {
  getRoadmapByCase,
  type Roadmap,
  type RoadmapFormData,
  type SavedRoadmap,
} from '@/lib/roadmap';

const SAVED_ROADMAP_KEY = 'savedRoadmap';

export default function RoadmapPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const { openModal } = useAuthModal();
  const promptedRef = useRef(false);

  const [step, setStep] = useState<'form' | 'result'>('form');
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [formData, setFormData] = useState<RoadmapFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 로그인 확인
  useEffect(() => {
    if (promptedRef.current || isLoading) return;
    if (!isLoggedIn) {
      promptedRef.current = true;
      openModal();
    }
  }, [isLoggedIn, isLoading, openModal]);

  // 폼 제출 처리
  const handleFormSubmit = (data: RoadmapFormData) => {
    const generatedRoadmap = getRoadmapByCase(data);
    setFormData(data);
    setRoadmap(generatedRoadmap);
    setStep('result');
    setIsSaved(false);
  };

  // 다시 시작
  const handleReset = () => {
    setStep('form');
    setRoadmap(null);
    setFormData(null);
    setIsSaved(false);
  };

  // 로드맵 저장 (localStorage)
  const handleSave = () => {
    if (!roadmap || !formData) return;

    setIsSaving(true);

    // TODO: 백엔드 연동 시 API 호출로 변경
    setTimeout(() => {
      const savedRoadmap: SavedRoadmap = {
        ...roadmap,
        savedAt: new Date().toISOString(),
        formData,
      };

      localStorage.setItem(SAVED_ROADMAP_KEY, JSON.stringify(savedRoadmap));
      setIsSaving(false);
      setIsSaved(true);
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          {step === 'form' ? (
            <div className="space-y-8">
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
            <RoadmapResult
              roadmap={roadmap}
              formData={formData}
              onReset={handleReset}
              onSave={handleSave}
              isSaving={isSaving}
              isSaved={isSaved}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
