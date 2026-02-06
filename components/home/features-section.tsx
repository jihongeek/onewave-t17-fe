import {
  Brain,
  ThumbsUp,
  Users,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI 점수 & 피드백",
    description:
      "아이디어를 등록하면 AI가 시장성, 혁신성, 실현 가능성을 분석하여 종합 점수와 상세 피드백을 즉시 제공합니다.",
  },
  {
    icon: ThumbsUp,
    title: "커뮤니티 업보트",
    description:
      "다른 창업자들의 아이디어를 발견하고 업보트하세요. 실시간 피드에서 가장 인기 있는 아이디어를 확인할 수 있습니다.",
  },
  {
    icon: Users,
    title: "팀 빌딩",
    description:
      "마음에 드는 아이디어에 팀원으로 참가 신청하세요. 역할별 모집 현황을 확인하고 함께 프로젝트를 시작하세요.",
  },
  {
    icon: LineChart,
    title: "자금 로드맵",
    description:
      "초기 비용 템플릿과 월/분기별 계획을 통해 체계적인 자금 로드맵을 작성하고 목표 대비 현황을 관리하세요.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-secondary px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            아이디어를 현실로 만드는 핵심 기능
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            AI 분석부터 커뮤니티 검증, 팀 빌딩, 자금 계획까지 스타트업의
            시작을 위한 모든 것
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
