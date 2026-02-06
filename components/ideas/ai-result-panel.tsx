"use client";

import type { AiResult } from "@/app/ideas/new/page";
import { ScoreGauge } from "@/components/score-gauge";
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AiResultPanelProps {
  result: AiResult | null;
  isAnalyzing: boolean;
}

export function AiResultPanel({ result, isAnalyzing }: AiResultPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="h-24 w-24 animate-pulse rounded-full bg-secondary" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
          <div className="mt-4 grid w-full grid-cols-3 gap-3">
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
          <Skeleton className="mt-4 h-20 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="sticky top-24 rounded-2xl border border-dashed border-border bg-card p-6 shadow-sm lg:p-8">
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            AI 분석 대기 중
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            아이디어 정보를 입력하고 AI 분석을 요청하면 여기에 결과가 표시됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-24 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <div className="flex flex-col items-center gap-2">
        <ScoreGauge score={result.totalScore} size={130} strokeWidth={10} label="종합 점수" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "시장성", value: result.marketScore },
          { label: "혁신성", value: result.innovationScore },
          { label: "실현가능", value: result.feasibilityScore },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-secondary p-3 text-center"
          >
            <div className="text-xl font-bold text-foreground">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          강점
        </h3>
        <ul className="flex flex-col gap-1.5">
          {result.strengths.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <AlertTriangle className="h-4 w-4 text-chart-4" />
          보완점
        </h3>
        <ul className="flex flex-col gap-1.5">
          {result.improvements.map((imp) => (
            <li
              key={imp}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
              {imp}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-accent p-4">
        <h3 className="mb-1 text-sm font-semibold text-accent-foreground">
          AI 종합 분석
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.summary}
        </p>
      </div>
    </div>
  );
}
