'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-primary/5 lg:flex">
        <div className="max-w-md px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Lightbulb className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-balance text-2xl font-bold text-foreground">
            아이디어를 현실로 만드는 첫걸음
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            AI가 당신의 아이디어를 분석하고, 커뮤니티가 검증합니다. 로그인하고
            지금 바로 시작하세요.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Lightbulb className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mavis</span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-foreground">로그인</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              계정에 로그인하여 아이디어를 관리하세요
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={e => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  비밀번호 재설정
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 입력"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="mt-2 w-full">
              로그인
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            아직 계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
