'use client';

import { useCallback, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { IdeaForm } from '@/components/ideas/idea-form';
import { AiResultPanel } from '@/components/ideas/ai-result-panel';
import { useAuth } from '@/lib/auth';
import { useAuthModal } from '@/components/auth-modal';
import { analyzeIdea, createIdea } from '@/lib/ideas/api';
import type { IdeaCreateRequest } from '@/lib/ideas/types';

export interface AiResult {
  totalScore: number;
  marketScore: number;
  innovationScore: number;
  feasibilityScore: number;
  strengths: string[];
  improvements: string[];
  summary: string;
}

export default function NewIdeaPage() {
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [postToUpvoteFeed, setPostToUpvoteFeed] = useState(false);
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();

  const requireLogin = useCallback(() => {
    if (isLoggedIn) return true;
    alert('로그인이 필요한 기능입니다');
    openModal();
    return false;
  }, [isLoggedIn, openModal]);

  const handleAnalyze = async (formData: IdeaCreateRequest) => {
    if (!requireLogin()) return;
    setIsAnalyzing(true);
    setAiResult(null);

    try {
      const createdIdea = await createIdea(formData);
      const analysis = await analyzeIdea(createdIdea.ideaId);

      const strengths = [analysis.strength1, analysis.strength2].filter(
        (value): value is string => Boolean(value && value.trim())
      );
      const improvements = [analysis.improvements1, analysis.improvements2].filter(
        (value): value is string => Boolean(value && value.trim())
      );

      const summaryParts = [];
      if (strengths.length > 0) {
        summaryParts.push(`강점: ${strengths.join(' / ')}`);
      }
      if (improvements.length > 0) {
        summaryParts.push(`보완점: ${improvements.join(' / ')}`);
      }

      setAiResult({
        totalScore: analysis.totalScore ?? 0,
        marketScore: analysis.marketScore ?? 0,
        innovationScore: analysis.innovationScore ?? 0,
        feasibilityScore: analysis.feasibilityScore ?? 0,
        strengths:
          strengths.length > 0 ? strengths : ['강점 정보가 제공되지 않았습니다.'],
        improvements:
          improvements.length > 0
            ? improvements
            : ['보완점 정보가 제공되지 않았습니다.'],
        summary:
          summaryParts.length > 0
            ? summaryParts.join(' ')
            : 'AI 분석 결과 요약이 제공되지 않았습니다.',
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'AI 분석에 실패했습니다.';
      alert(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              AI 분석
            </h1>
            <p className="mt-2 text-muted-foreground">
              아이디어 정보를 입력하면 AI가 즉시 분석하여 점수와 피드백을
              제공합니다.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <IdeaForm
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                postToUpvoteFeed={postToUpvoteFeed}
                onPostToUpvoteFeedChange={setPostToUpvoteFeed}
                isPostToUpvoteFeedDisabled={!aiResult || isAnalyzing}
              />
            </div>
            <div className="lg:col-span-2">
              <AiResultPanel result={aiResult} isAnalyzing={isAnalyzing} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
