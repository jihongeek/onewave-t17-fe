"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";

interface IdeaFormProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function IdeaForm({ onAnalyze, isAnalyzing }: IdeaFormProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <h2 className="mb-6 text-lg font-semibold text-foreground">
        아이디어 정보
      </h2>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          onAnalyze();
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">아이디어 제목</Label>
          <Input
            id="title"
            placeholder="한 줄로 요약해 주세요"
            defaultValue="AI 기반 개인 건강 관리 챗봇"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="problem">해결하려는 문제</Label>
          <Textarea
            id="problem"
            placeholder="어떤 문제를 해결하고자 하나요?"
            rows={3}
            defaultValue="바쁜 현대인들이 건강 관리에 소홀해지는 문제. 병원 방문 전 간단한 증상 확인과 건강 상담이 어려운 상황."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="target">타겟 고객</Label>
          <Input
            id="target"
            placeholder="주요 타겟 고객층을 설명해 주세요"
            defaultValue="25-45세 직장인, 건강에 관심 있지만 시간이 부족한 도시 거주자"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="solution">해결 방안</Label>
          <Textarea
            id="solution"
            placeholder="아이디어의 핵심 해결 방안을 설명해 주세요"
            rows={3}
            defaultValue="AI 챗봇을 통한 24시간 건강 상담, 증상 분석, 건강 습관 추적 및 맞춤형 건강 조언 제공."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="differentiator">차별성</Label>
          <Textarea
            id="differentiator"
            placeholder="기존 솔루션과의 차별 포인트를 설명해 주세요"
            rows={3}
            defaultValue="기존 건강 앱과 달리 대화형 AI를 통해 개인화된 상담 제공. 의료 데이터 기반 정확한 분석과 병원 연계 시스템."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>카테고리</Label>
            <Select defaultValue="healthcare">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">헬스케어</SelectItem>
                <SelectItem value="fintech">핀테크</SelectItem>
                <SelectItem value="edtech">에듀테크</SelectItem>
                <SelectItem value="ecommerce">이커머스</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="social">소셜</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>단계</Label>
            <Select defaultValue="idea">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">아이디어 단계</SelectItem>
                <SelectItem value="prototype">프로토타입</SelectItem>
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="launched">출시 완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-2"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              AI 분석 중...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              AI 분석 요청
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
