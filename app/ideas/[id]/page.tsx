"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScoreGauge } from "@/components/score-gauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Users,
  CheckCircle2,
  AlertTriangle,
  Send,
  UserPlus,
} from "lucide-react";

const MOCK_IDEA = {
  id: "1",
  title: "AI 기반 개인 건강 관리 챗봇",
  problem:
    "바쁜 현대인들이 건강 관리에 소홀해지는 문제. 병원 방문 전 간단한 증상 확인과 건강 상담이 어려운 상황.",
  target: "25-45세 직장인, 건강에 관심 있지만 시간이 부족한 도시 거주자",
  solution:
    "AI 챗봇을 통한 24시간 건강 상담, 증상 분석, 건강 습관 추적 및 맞춤형 건강 조언 제공.",
  differentiator:
    "기존 건강 앱과 달리 대화형 AI를 통해 개인화된 상담 제공. 의료 데이터 기반 정확한 분석과 병원 연계 시스템.",
  score: 87,
  marketScore: 92,
  innovationScore: 85,
  feasibilityScore: 84,
  upvotes: 142,
  tags: ["헬스케어", "AI/ML", "B2C"],
  author: "김민수",
  createdAt: "2025년 2월 4일",
  strengths: [
    "명확한 타겟 시장과 고객 세그먼트를 설정했습니다.",
    "해결하려는 문제가 실제로 존재하는 시장 니즈입니다.",
    "기존 솔루션 대비 차별화 포인트가 분명합니다.",
  ],
  improvements: [
    "수익 모델에 대한 구체적인 계획이 필요합니다.",
    "기술 구현 난이도에 대한 리스크 분석을 추가하세요.",
  ],
  team: [
    { name: "김민수", role: "기획/PM", avatar: "김" },
    { name: "이지연", role: "프론트엔드", avatar: "이" },
  ],
  openRoles: ["백엔드 개발자", "AI/ML 엔지니어", "디자이너"],
  comments: [
    {
      id: "c1",
      author: "박서윤",
      avatar: "박",
      text: "헬스케어 쪽 규제 이슈는 어떻게 해결할 계획인가요? 의료법 관련 검토가 필요할 것 같습니다.",
      createdAt: "1시간 전",
      likes: 5,
    },
    {
      id: "c2",
      author: "최준혁",
      avatar: "최",
      text: "비슷한 서비스를 사용해 본 적이 있는데, 정확도가 핵심일 것 같습니다. 의료 데이터 파트너십이 있나요?",
      createdAt: "3시간 전",
      likes: 3,
    },
    {
      id: "c3",
      author: "정하린",
      avatar: "정",
      text: "타겟층이 명확하고 니즈가 큰 시장이라 가능성이 높아 보입니다. 수익 모델이 구독형인지 궁금합니다!",
      createdAt: "5시간 전",
      likes: 8,
    },
  ],
};

export default function IdeaDetailPage() {
  const [votes, setVotes] = useState(MOCK_IDEA.upvotes);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [commentText, setCommentText] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Header */}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setVoted(voted === "up" ? null : "up");
                        setVotes(
                          voted === "up"
                            ? MOCK_IDEA.upvotes
                            : MOCK_IDEA.upvotes + 1
                        );
                      }}
                      className={`rounded-md p-1 transition-colors ${
                        voted === "up"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      aria-label="업보트"
                    >
                      <ChevronUp className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-bold text-foreground">
                      {votes}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setVoted(voted === "down" ? null : "down");
                        setVotes(
                          voted === "down"
                            ? MOCK_IDEA.upvotes
                            : MOCK_IDEA.upvotes - 1
                        );
                      }}
                      className={`rounded-md p-1 transition-colors ${
                        voted === "down"
                          ? "text-destructive"
                          : "text-muted-foreground hover:text-destructive"
                      }`}
                      aria-label="다운보트"
                    >
                      <ChevronDown className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-foreground">
                      {MOCK_IDEA.title}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {MOCK_IDEA.author}
                      </span>
                      <span>|</span>
                      <span>{MOCK_IDEA.createdAt}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {MOCK_IDEA.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      해결하려는 문제
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {MOCK_IDEA.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      타겟 고객
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {MOCK_IDEA.target}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      해결 방안
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {MOCK_IDEA.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      차별성
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {MOCK_IDEA.differentiator}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <MessageCircle className="h-5 w-5" />
                  댓글 ({MOCK_IDEA.comments.length})
                </h2>

                <div className="mb-6 flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      나
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-2">
                    <Textarea
                      placeholder="의견을 남겨주세요..."
                      rows={2}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button size="sm" disabled={!commentText.trim()}>
                        <Send className="mr-1.5 h-3.5 w-3.5" />
                        댓글 작성
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {MOCK_IDEA.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-3 rounded-lg border border-border p-4"
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-xs">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">
                            {comment.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* AI Score */}
              <div className="sticky top-24 flex flex-col gap-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-center text-sm font-semibold text-foreground">
                    AI 분석 결과
                  </h2>
                  <div className="flex justify-center">
                    <ScoreGauge
                      score={MOCK_IDEA.score}
                      size={120}
                      strokeWidth={9}
                      label="종합 점수"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { label: "시장성", value: MOCK_IDEA.marketScore },
                      { label: "혁신성", value: MOCK_IDEA.innovationScore },
                      { label: "실현가능", value: MOCK_IDEA.feasibilityScore },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-secondary p-2.5 text-center"
                      >
                        <div className="text-lg font-bold text-foreground">
                          {item.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      강점
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {MOCK_IDEA.strengths.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <AlertTriangle className="h-3.5 w-3.5 text-chart-4" />
                      보완점
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {MOCK_IDEA.improvements.map((imp) => (
                        <li
                          key={imp}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-chart-4" />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Team */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Users className="h-4 w-4" />
                    팀 현황
                  </h2>

                  <div className="flex flex-col gap-3">
                    {MOCK_IDEA.team.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center gap-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {member.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <h3 className="mb-2 text-xs font-semibold text-foreground">
                      모집 중인 역할
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {MOCK_IDEA.openRoles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className="text-xs"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="mt-4 w-full" size="sm">
                    <UserPlus className="mr-1.5 h-4 w-4" />
                    팀 참가 신청
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
