export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "마이크로 비즈니스 설계",
      description:
        "해결할 문제와 수익 구조를 정의하고, 작게 시작할 모델을 만듭니다.",
    },
    {
      step: "02",
      title: "실행 & 운영 로그",
      description:
        "실제 고객 대응과 매출 테스트를 수행하며 운영 데이터를 축적합니다.",
    },
    {
      step: "03",
      title: "실전 리포트 생성",
      description:
        "활동 로그를 AI가 분석해 시장성과 실행력을 증명합니다.",
    },
    {
      step: "04",
      title: "확장 & 전환",
      description:
        "성과가 보이면 기능 확장과 자동화로 Micro Business 전환을 가속합니다.",
    },
  ];

  return (
    <section className="bg-background px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Micro Business로 가는 4단계
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            작게 검증하고 빠르게 성장시키는 실전 프로세스를 제공합니다
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <span className="text-lg font-bold">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
