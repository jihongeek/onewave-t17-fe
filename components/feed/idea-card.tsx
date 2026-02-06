"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { likeFeed, unlikeFeed } from "@/lib/ideas/api";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Users,
  Clock,
} from "lucide-react";

interface IdeaCardProps {
  idea: {
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
    likedByMe?: boolean;
  };
  onVoteChange?: (payload: {
    ideaId: string;
    upvotes: number;
    likedByMe: boolean;
  }) => void;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-primary";
  if (score >= 60) return "text-chart-4";
  return "text-destructive";
}

export function IdeaCard({ idea, onVoteChange }: IdeaCardProps) {
  const [votes, setVotes] = useState(idea.upvotes);
  const [voted, setVoted] = useState<"up" | "down" | null>(
    idea.likedByMe ? "up" : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setVotes(idea.upvotes);
    setVoted(idea.likedByMe ? "up" : null);
  }, [idea.likedByMe, idea.upvotes]);

  const handleUpvote = async () => {
    if (isSubmitting) return;
    const feedId = Number(idea.id);
    if (Number.isNaN(feedId)) return;

    const wasLiked = voted === "up";
    const prevVotes = votes;
    const prevVoted = voted;
    const nextVotes = Math.max(0, prevVotes + (wasLiked ? -1 : 1));
    setIsSubmitting(true);
    setVotes(nextVotes);
    setVoted(wasLiked ? null : "up");
    onVoteChange?.({
      ideaId: idea.id,
      upvotes: nextVotes,
      likedByMe: !wasLiked,
    });

    try {
      if (wasLiked) {
        await unlikeFeed(feedId);
      } else {
        await likeFeed(feedId);
      }
    } catch (error) {
      setVotes(prevVotes);
      setVoted(prevVoted);
      onVoteChange?.({
        ideaId: idea.id,
        upvotes: prevVotes,
        likedByMe: prevVoted === "up",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownvote = async () => {
    if (isSubmitting) return;
    if (votes <= 0) return;

    const feedId = Number(idea.id);
    if (Number.isNaN(feedId)) return;
    if (voted !== "up") return;

    const prevVotes = votes;
    const prevVoted = voted;
    setIsSubmitting(true);
    setVotes(Math.max(0, prevVotes - 1));
    setVoted(null);
    onVoteChange?.({
      ideaId: idea.id,
      upvotes: Math.max(0, prevVotes - 1),
      likedByMe: false,
    });

    try {
      await unlikeFeed(feedId);
    } catch (error) {
      setVotes(prevVotes);
      setVoted(prevVoted);
      onVoteChange?.({
        ideaId: idea.id,
        upvotes: prevVotes,
        likedByMe: prevVoted === "up",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-sm">
      <div className="flex flex-col items-center gap-0.5">
        <button
          type="button"
          onClick={handleUpvote}
          className={`rounded-md p-1 transition-colors ${
            voted === "up"
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
          aria-label="업보트"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-foreground">{votes}</span>
        <button
          type="button"
          onClick={handleDownvote}
          className={`rounded-md p-1 transition-colors ${
            voted === "down"
              ? "text-destructive"
              : "text-muted-foreground hover:text-destructive"
          }`}
          aria-label="다운보트"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/ideas/${idea.id}`}
              className="text-base font-semibold text-foreground transition-colors hover:text-primary"
            >
              {idea.title}
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {idea.summary}
            </p>
          </div>
          <div
            className={`flex-shrink-0 text-right ${getScoreColor(idea.score)}`}
          >
            <div className="text-2xl font-bold">{idea.score}</div>
            <div className="text-[10px] font-medium text-muted-foreground">
              AI점수
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {idea.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{idea.author}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {idea.createdAt}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {idea.comments}
          </span>
          {idea.teamOpen && (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto h-7 text-xs bg-transparent"
            >
              <Users className="mr-1 h-3 w-3" />
              팀 참가
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
