"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IdeaCard } from "@/components/feed/idea-card";
import { FeedFilters } from "@/components/feed/feed-filters";
import { listFeeds } from "@/lib/ideas/api";
import type { FeedListItemResponse, IdeaCategory } from "@/lib/ideas/types";

type IdeaCardData = {
  id: string;
  title: string;
  summary: string;
  score: number;
  upvotes: number;
  comments: number;
  author: string;
  tags: string[];
  teamOpen: boolean;
  createdAt: string;
  likedByMe: boolean;
};

const CATEGORY_LABELS: Record<IdeaCategory, string> = {
  HEALTHCARE: "헬스케어",
  FINTECH: "핀테크",
  EDUTECH: "에듀테크",
  ECOMMERCE: "이커머스",
  SAAS: "SaaS",
  SOCIAL: "소셜",
  OTHER: "기타",
};

const CATEGORY_FILTER_MAP: Record<string, IdeaCategory | "ALL"> = {
  all: "ALL",
  healthcare: "HEALTHCARE",
  fintech: "FINTECH",
  edtech: "EDUTECH",
  ecommerce: "ECOMMERCE",
  saas: "SAAS",
};

function formatDate(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function toIdeaCardData(feed: FeedListItemResponse): IdeaCardData {
  return {
    id: String(feed.feedId),
    title: feed.title,
    summary: feed.problem,
    score: feed.totalScore,
    upvotes: feed.likeCount,
    comments: feed.commentCount,
    author: feed.authorName,
    tags: [CATEGORY_LABELS[feed.category] ?? "기타"],
    teamOpen: false,
    createdAt: formatDate(feed.createdAt),
    likedByMe: feed.likedByMe,
  };
}

export default function FeedPage() {
  const [sortBy, setSortBy] = useState("popular");
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [feeds, setFeeds] = useState<FeedListItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeeds = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const data = await listFeeds();
        if (isMounted) {
          setFeeds(data);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "피드를 불러오지 못했습니다."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFeeds();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFeeds = useMemo(() => {
    const mappedCategory = CATEGORY_FILTER_MAP[category] ?? "ALL";
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return feeds.filter((feed) => {
      const categoryMatch =
        mappedCategory === "ALL" || feed.category === mappedCategory;
      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;
      const searchableText = [
        feed.title,
        feed.problem,
        feed.authorName,
        CATEGORY_LABELS[feed.category] ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [category, feeds, searchQuery]);

  const sortedIdeas = useMemo(() => {
    const sorted = [...filteredFeeds];
    sorted.sort((a, b) => {
      if (sortBy === "popular") return b.likeCount - a.likeCount;
      if (sortBy === "score") return b.totalScore - a.totalScore;
      if (sortBy === "recent") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });
    return sorted.map(toIdeaCardData);
  }, [filteredFeeds, sortBy]);

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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="mt-6 flex flex-col gap-4">
            {isLoading && (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                피드를 불러오는 중입니다...
              </div>
            )}
            {errorMessage && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
                {errorMessage}
              </div>
            )}
            {!isLoading &&
              !errorMessage &&
              sortedIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            {!isLoading && !errorMessage && sortedIdeas.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                {searchQuery.trim().length > 0
                  ? "검색 결과가 없습니다."
                  : "아직 등록된 피드가 없습니다."}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
