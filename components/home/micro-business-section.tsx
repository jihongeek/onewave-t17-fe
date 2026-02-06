export function MicroBusinessSection() {
  return (
    <section className="bg-secondary px-4 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            왜 지금, 나만의 아이디어로 시작해야 할까요?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            거대 조직이 아닌 개인이 AI로 무장하는 시대입니다. 가벼운 실험이
            더 빠르게 검증되고, 그 결과가 Micro Business로 이어집니다.
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/bKbo8Rr5Y_0"
              title="송길영 | 시대예보: 경량문명의 탄생"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  );
}
