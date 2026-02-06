import Link from "next/link";
import { Lightbulb } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Lightbulb className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                IdeaForge
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI 기반 아이디어 검증 플랫폼으로 당신의 스타트업 아이디어를 현실로
              만들어 보세요.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              서비스
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/ideas/new"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  아이디어 등록
                </Link>
              </li>
              <li>
                <Link
                  href="/feed"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  업보트 피드
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  자금 로드맵
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              계정
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  회원가입
                </Link>
              </li>
              <li>
                <Link
                  href="/mypage"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  마이페이지
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              지원
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  이용약관
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  개인정보처리방침
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  고객센터
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 IdeaForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
