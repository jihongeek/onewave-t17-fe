import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScoreGauge } from "@/components/score-gauge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 pb-20 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(95_46%_55%/0.08),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              AI 기반 아이디어 검증 플랫폼
            </span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            당신의 아이디어,
            <br />
            <span className="text-primary">AI가 검증</span>합니다
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            스타트업 아이디어를 등록하면 AI가 즉시 점수를 매기고 피드백을
            제공합니다. 커뮤니티 업보트와 팀 빌딩까지 한 곳에서.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/ideas/new">
                아이디어 등록하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/feed">업보트 피드 보기</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>무료로 시작</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>실시간 AI 분석</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>커뮤니티 피드백</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                AI 아이디어 분석 결과
              </span>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                실시간
              </span>
            </div>
            <div className="flex items-start gap-6">
              <ScoreGauge score={87} size={100} strokeWidth={8} />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  AI 헬스케어 챗봇
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  시장 수요와 기술 실현 가능성이 높으며, 타겟 시장이 명확합니다.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    헬스케어
                  </span>
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    AI/ML
                  </span>
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                    B2C
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "시장성", value: 92 },
                { label: "혁신성", value: 85 },
                { label: "실현가능", value: 84 },
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
