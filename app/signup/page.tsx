'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lightbulb, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-primary/5 lg:flex">
        <div className="max-w-md px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Lightbulb className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-balance text-2xl font-bold text-foreground">
            아이디어의 가능성을 검증하세요
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            무료 회원가입으로 AI 분석, 커뮤니티 피드백, 팀 빌딩 기능을 모두
            이용해 보세요.
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
            <h1 className="mt-4 text-2xl font-bold text-foreground">
              회원가입
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              무료로 계정을 만들고 아이디어를 시작하세요
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={e => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                autoComplete="name"
              />
            </div>

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
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상 입력"
                  autoComplete="new-password"
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

            <div className="flex flex-col gap-3 pt-1">
              <div className="flex items-start gap-2">
                <Checkbox id="terms" className="mt-0.5" />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal leading-relaxed text-muted-foreground"
                >
                  <span className="font-medium text-foreground">이용약관</span>{' '}
                  및{' '}
                  <span className="font-medium text-foreground">
                    개인정보처리방침
                  </span>
                  에 동의합니다
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="marketing" className="mt-0.5" />
                <Label
                  htmlFor="marketing"
                  className="text-sm font-normal text-muted-foreground"
                >
                  마케팅 정보 수신에 동의합니다 (선택)
                </Label>
              </div>
            </div>

            <Button type="submit" className="mt-2 w-full">
              회원가입
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
