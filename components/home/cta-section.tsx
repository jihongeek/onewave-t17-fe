'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useAuthModal } from '@/components/auth-modal';

export function CtaSection() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();

  const handleCtaClick = () => {
    if (isLoggedIn) {
      router.push('/ideas/new');
    } else {
      openModal();
    }
  };

  return (
    <section className="bg-secondary px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Micro Business가 아니더라도 괜찮습니다
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          실제 서비스 운영과 데이터 기록을 다루는 것으로도 {''}
          <span className="font-semibold text-foreground">
            취업 시장에서 원하는 인재로 {''}
          </span>
          인정받을 수 있습니다.
          <br /> 작은 실행이 강력한 경쟁력이 됩니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={handleCtaClick}>
            지금 시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/feed">업보트 피드 보기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
