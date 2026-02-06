"use client";

import { useCallback, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IdeaForm } from "@/components/ideas/idea-form";
import { AiResultPanel } from "@/components/ideas/ai-result-panel";
import { useAuth } from "@/lib/auth";
import { useAuthModal } from "@/components/auth-modal";

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
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();

  const requireLogin = useCallback(() => {
    if (isLoggedIn) return true;
    alert("로그인이 필요한 기능입니다");
    openModal();
    return false;
  }, [isLoggedIn, openModal]);

  const handleAnalyze = () => {
    if (!requireLogin()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiResult({
        totalScore: 82,
        marketScore: 88,
        innovationScore: 79,
        feasibilityScore: 78,
        strengths: [
          "명확한 타겟 시장과 고객 세그먼트를 설정했습니다.",
          "해결하려는 문제가 실제로 존재하는 시장 니즈입니다.",
          "기존 솔루션 대비 차별화 포인트가 분명합니다.",
        ],
        improvements: [
          "수익 모델에 대한 구체적인 계획이 필요합니다.",
          "기술 구현 난이도에 대한 리스크 분석을 추가하세요.",
          "경쟁사 분석을 더 상세하게 보완하면 좋겠습니다.",
        ],
        summary:
          "전반적으로 시장성이 높고 문제 정의가 명확한 아이디어입니다. 타겟 고객과 해결 방안이 잘 연결되어 있으며, 차별성도 충분합니다. 다만 수익 모델과 기술적 리스크에 대한 보완이 필요합니다.",
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              새 아이디어 등록
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
