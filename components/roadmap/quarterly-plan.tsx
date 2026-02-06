"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

const quarters = [
  {
    label: "Q1 2026",
    budget: 5000,
    spent: 4200,
    goals: [
      { text: "MVP 개발 완료", done: true },
      { text: "핵심 팀원 채용", done: true },
      { text: "베타 테스트 시작", done: false },
    ],
  },
  {
    label: "Q2 2026",
    budget: 7000,
    spent: 2100,
    goals: [
      { text: "퍼블릭 베타 출시", done: false },
      { text: "마케팅 캠페인 시작", done: false },
      { text: "1,000 사용자 확보", done: false },
    ],
  },
  {
    label: "Q3 2026",
    budget: 9000,
    spent: 0,
    goals: [
      { text: "정식 출시", done: false },
      { text: "수익화 모델 적용", done: false },
      { text: "시드 투자 유치", done: false },
    ],
  },
];

export function QuarterlyPlan() {
  return (
    <div className="flex flex-col gap-4">
      {quarters.map((q) => {
        const pct = q.budget > 0 ? Math.round((q.spent / q.budget) * 100) : 0;
        return (
          <div
            key={q.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                {q.label}
              </h3>
              <span className="text-xs text-muted-foreground">
                {q.spent.toLocaleString()}만 / {q.budget.toLocaleString()}만원
              </span>
            </div>

            <Progress value={pct} className="mb-4 h-2" />

            <ul className="flex flex-col gap-2">
              {q.goals.map((goal) => (
                <li key={goal.text} className="flex items-center gap-2 text-sm">
                  {goal.done ? (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}
                  <span
                    className={
                      goal.done
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }
                  >
                    {goal.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
