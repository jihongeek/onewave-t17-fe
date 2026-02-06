import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-secondary px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          지금 바로 아이디어를 검증해 보세요
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          무료로 시작하고, AI의 객관적인 분석과 커뮤니티의 생생한 피드백을 받아
          보세요. 당신의 아이디어가 다음 유니콘이 될 수 있습니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/signup">
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/feed">아이디어 둘러보기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
