'use client';

import Link from "next/link";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScoreGauge } from "@/components/score-gauge";
import { TypingHeadline } from "@/components/home/typing-headline";
import { useAuth } from "@/lib/auth";
import { useAuthModal } from "@/components/auth-modal";

export function HeroSection() {
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();

  const handleProtectedClick = (
    event: MouseEvent<HTMLElement>,
    requiresAuth?: boolean
  ) => {
    if (!requiresAuth || isLoggedIn) return;
    event.preventDefault();
    alert("로그인이 필요한 기능입니다");
    openModal();
  };

  return (
    <section className="relative overflow-hidden bg-background px-4 pb-20 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(95_46%_55%/0.08),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              작은 비즈니스로 시작하는 실전 검증
            </span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            아이디어를
            <br />
            <span className="whitespace-nowrap">
              <TypingHeadline
                phrases={[
                  "Micro Business로",
                  "실 사용 서비스로",
                  "경력으로",
                ]}
                className="text-primary"
              />
            </span>
            <br />
            전환하세요
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            고객 문제를 해결하는 작은 사업을 직접 설계·운영하며 매출과 운영
            데이터를 쌓습니다. AI가 이를 분석해 신뢰 가능한 실전 리포트로
            정리하고, 성장하면 자연스럽게 창업으로 확장할 수 있습니다. Micro
            Business가 아니더라도, 이 경험 자체가 많은 직장에서 원하는
            경력 있는 인재로 인정받는 강력한 기회가 됩니다.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link
                href="/ideas/new"
                onClick={event => handleProtectedClick(event, true)}
              >
                Micro Business 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/feed">실전 사례 둘러보기</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>소규모로 빠른 시작</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>운영 데이터 리포트</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>성장 시 창업 전환</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                Micro Business 운영 리포트
              </span>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                실시간
              </span>
            </div>
            <div className="flex items-start gap-6">
              <ScoreGauge score={87} size={100} strokeWidth={8} />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  지역 소상공인 예약 자동화
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  실제 고객 유입과 매출 테스트를 완료했고, 반복 개선 로그가
                  축적되어 있습니다.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    로컬 비즈니스
                  </span>
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    운영 자동화
                  </span>
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    수익 검증
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "고객 반응", value: 91 },
                  { label: "수익화", value: 86 },
                  { label: "반복 개선", value: 88 },
                ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-secondary p-3 text-center"
                >
                  <div className="text-lg font-bold text-foreground">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
