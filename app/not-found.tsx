import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary px-4">
      <div className="text-center">
        {/* 404 큰 텍스트 */}
        <h1 className="text-[150px] font-bold leading-none text-primary/20 sm:text-[200px]">
          404
        </h1>

        {/* 메시지 */}
        <div className="-mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            요청하신 페이지가 존재하지 않거나, 이동되었거나, 삭제되었을 수
            있습니다.
          </p>
        </div>

        {/* 버튼들 */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              홈으로 이동
            </Link>
          </Button>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  );
}
