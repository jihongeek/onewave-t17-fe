'use client';

import Link from 'next/link';
import { useState, type MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Menu, X, TrendingUp, Map, User } from 'lucide-react';
import { AuthModalButton, useAuthModal } from '@/components/auth-modal';
import { useAuth } from '@/lib/auth';

// 마이페이지 제외한 navLinks (마이페이지는 로그인 후 아이콘으로 표시)
const navLinks = [
  { href: '/ideas/new', label: 'AI 분석', icon: Lightbulb, requiresAuth: true },
  { href: '/feed', label: '업보트 피드', icon: TrendingUp },
  { href: '/roadmap', label: '로드맵', icon: Map, requiresAuth: true },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, isLoading, user } = useAuth();
  const { openModal } = useAuthModal();

  const handleProtectedClick = (
    event: MouseEvent<HTMLElement>,
    requiresAuth?: boolean
  ) => {
    if (!requiresAuth || isLoggedIn) return true;
    event.preventDefault();
    alert('로그인이 필요한 기능입니다');
    openModal();
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Mavis
          </span>
        </Link>

        {/* navLinks와 버튼들을 오른쪽에 배치 */}
        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={event => handleProtectedClick(event, link.requiresAuth)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isLoading ? (
              // 로딩 중
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            ) : isLoggedIn ? (
              // 로그인된 상태: 마이페이지 아이콘만 표시 (로그아웃은 마이페이지에서)
              <>
                <span className="text-sm text-muted-foreground">
                  {user?.name}님
                </span>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/mypage" aria-label="마이페이지">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              // 비로그인 상태: 로그인 모달 버튼
              <AuthModalButton />
            )}
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={event => {
                    const canNavigate = handleProtectedClick(
                      event,
                      link.requiresAuth
                    );
                    if (canNavigate) {
                      setMobileOpen(false);
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            {/* 모바일: 로그인 시 마이페이지 링크 표시 */}
            {isLoggedIn && (
              <Link
                href="/mypage"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <User className="h-4 w-4" />
                마이페이지
              </Link>
            )}
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            {isLoading ? (
              <div className="h-8 w-full animate-pulse rounded bg-muted" />
            ) : isLoggedIn ? (
              // 모바일: 로그인 상태일 때 (로그아웃은 마이페이지에서)
              <span className="px-3 text-sm text-muted-foreground">
                {user?.name}님
              </span>
            ) : (
              // 모바일: 비로그인 상태 - 로그인 모달
              <AuthModalButton />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
