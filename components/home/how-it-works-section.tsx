export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "아이디어 등록",
      description:
        "문제, 타겟 고객, 해결 방안, 차별성 등을 입력하면 AI가 분석을 시작합니다.",
    },
    {
      step: "02",
      title: "AI 점수 확인",
      description:
        "AI가 시장성, 혁신성, 실현 가능성을 종합 분석하여 점수와 피드백을 제공합니다.",
    },
    {
      step: "03",
      title: "커뮤니티 검증",
      description:
        "다른 사용자들의 업보트와 댓글로 아이디어의 시장 반응을 미리 확인합니다.",
    },
    {
      step: "04",
      title: "팀 빌딩 & 실행",
      description:
        "팀원을 모집하고 자금 로드맵을 작성하여 아이디어를 현실로 만들어 보세요.",
    },
  ];

  return (
    <section className="bg-background px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            간단한 4단계로 시작하세요
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            아이디어 등록부터 실행까지, 체계적인 프로세스를 통해 안내합니다
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
