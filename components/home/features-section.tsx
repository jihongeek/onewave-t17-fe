import {
  Brain,
  ThumbsUp,
  Users,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "실전 샌드박스 설계",
    description:
      "작은 규모로 빠르게 시작해 고객 문제 해결과 수익화 과정을 직접 경험합니다.",
  },
  {
    icon: ThumbsUp,
    title: "과정 데이터 인증",
    description:
      "코드, 지표, 운영 로그를 AI가 분석해 신뢰할 수 있는 실전 리포트로 전환합니다.",
  },
  {
    icon: Users,
    title: "시장 반응 검증",
    description:
      "실제 고객 반응과 운영 의사결정 기록으로 시장성을 빠르게 검증합니다.",
  },
  {
    icon: LineChart,
    title: "Micro Business 전환",
    description:
      "성과가 쌓이면 서비스화·자동화로 확장해 정식 사업으로 전환할 수 있습니다.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-background px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            아이디어가 매출로 이어지는 핵심 기능
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            소규모 실전 검증부터 Micro Business 전환까지 한 흐름으로 연결합니다
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
