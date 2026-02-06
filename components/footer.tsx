'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export function Footer() {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {/* 메인 콘텐츠 */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* 로고 및 설명 */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">Mavis</span>
            </Link>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              AI 기반 아이디어 검증 플랫폼
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
