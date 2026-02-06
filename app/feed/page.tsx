"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IdeaCard } from "@/components/feed/idea-card";
import { FeedFilters } from "@/components/feed/feed-filters";

const MOCK_IDEAS = [
  {
    id: "1",
    title: "AI 기반 개인 건강 관리 챗봇",
    summary:
      "바쁜 현대인을 위한 24시간 AI 건강 상담 서비스. 증상 분석, 건강 습관 추적 및 맞춤 조언 제공.",
    score: 87,
    upvotes: 142,
    comments: 28,
    author: "김민수",
    tags: ["헬스케어", "AI/ML", "B2C"],
    teamOpen: true,
    createdAt: "2시간 전",
  },
  {
    id: "2",
    title: "프리랜서 세금 자동 계산 플랫폼",
    summary:
      "프리랜서와 1인 사업자를 위한 자동 세금 계산 및 신고 준비 도구. 영수증 OCR 인식과 절세 팁 제공.",
    score: 79,
    upvotes: 98,
    comments: 15,
    author: "이지연",
    tags: ["핀테크", "SaaS", "B2B"],
    teamOpen: true,
    createdAt: "4시간 전",
  },
  {
    id: "3",
    title: "중고 명품 AI 감정 서비스",
    summary:
      "사진만 촬영하면 AI가 명품의 진위 여부를 판별해주는 모바일 앱. C2C 거래 시 신뢰도를 높여줍니다.",
    score: 73,
    upvotes: 76,
    comments: 22,
    author: "박서윤",
    tags: ["이커머스", "AI/ML", "C2C"],
    teamOpen: false,
    createdAt: "6시간 전",
  },
  {
    id: "4",
    title: "구독형 오피스 간식 큐레이션",
    summary:
      "회사 규모와 선호도에 맞춰 매주 다른 간식을 배달하는 B2B 구독 서비스. 직원 만족도 향상에 기여.",
    score: 65,
    upvotes: 54,
    comments: 8,
    author: "최준혁",
    tags: ["이커머스", "구독", "B2B"],
    teamOpen: true,
    createdAt: "12시간 전",
  },
  {
    id: "5",
    title: "AI 기반 이력서 최적화 도구",
    summary:
      "채용 공고를 분석하여 이력서를 최적화해주는 AI 서비스. 합격률을 높이는 키워드와 구성을 추천합니다.",
    score: 91,
    upvotes: 203,
    comments: 42,
    author: "정하린",
    tags: ["HR테크", "AI/ML", "SaaS"],
    teamOpen: true,
    createdAt: "1일 전",
  },
  {
    id: "6",
    title: "반려동물 행동 분석 카메라",
    summary:
      "AI 카메라로 반려동물의 행동 패턴을 분석하고 건강 이상 징후를 조기에 감지하는 IoT 서비스.",
    score: 70,
    upvotes: 67,
    comments: 19,
    author: "윤도현",
    tags: ["펫테크", "IoT", "B2C"],
    teamOpen: false,
    createdAt: "1일 전",
  },
];

export default function FeedPage() {
  const [sortBy, setSortBy] = useState("popular");
  const [category, setCategory] = useState("all");

  const sortedIdeas = [...MOCK_IDEAS].sort((a, b) => {
    if (sortBy === "popular") return b.upvotes - a.upvotes;
    if (sortBy === "score") return b.score - a.score;
    return 0;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              업보트 피드
            </h1>
            <p className="mt-2 text-muted-foreground">
              커뮤니티에서 가장 주목받는 아이디어를 발견하고 투표하세요
            </p>
          </div>

          <FeedFilters
            sortBy={sortBy}
            onSortChange={setSortBy}
            category={category}
            onCategoryChange={setCategory}
          />

          <div className="mt-6 flex flex-col gap-4">
            {sortedIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
