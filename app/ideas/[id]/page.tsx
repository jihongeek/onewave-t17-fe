"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScoreGauge } from "@/components/score-gauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { useAuthModal } from "@/components/auth-modal";
import {
  addFeedComment,
  approveFeedApplication,
  applyToFeed,
  getFeedDetail,
  listFeedApplications,
  listFeedComments,
  rejectFeedApplication,
} from "@/lib/ideas/api";
import type {
  FeedApplicationResponse,
  FeedCommentResponse,
  FeedDetailResponse,
  FeedPositionStatusResponse,
  IdeaCategory,
} from "@/lib/ideas/types";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Users,
  CheckCircle2,
  AlertTriangle,
  Send,
  UserPlus,
  Check,
  X,
  LogIn,
} from "lucide-react";

const CATEGORY_LABELS: Record<IdeaCategory, string> = {
  HEALTHCARE: "헬스케어",
  FINTECH: "핀테크",
  EDUTECH: "에듀테크",
  ECOMMERCE: "이커머스",
  SAAS: "SaaS",
  SOCIAL: "소셜",
  OTHER: "기타",
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

type TeamMember = {
  name: string;
  role: string;
  profileImageUrl?: string;
};

export default function IdeaDetailPage() {
  const params = useParams<{ id?: string }>();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { openModal } = useAuthModal();
  const [feed, setFeed] = useState<FeedDetailResponse | null>(null);
  const [comments, setComments] = useState<FeedCommentResponse[]>([]);
  const [applications, setApplications] = useState<FeedApplicationResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [processingApplicationIds, setProcessingApplicationIds] = useState<
    number[]
  >([]);
  const [isOwner, setIsOwner] = useState(false);
  const [baseVotes, setBaseVotes] = useState(0);
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    const feedIdParam = params?.id;
    const parsedId = Number(feedIdParam);
    if (!feedIdParam || Number.isNaN(parsedId)) {
      setErrorMessage("유효하지 않은 피드 ID입니다.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchFeed = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const [feedResult, commentResult, applicationResult] =
          await Promise.allSettled([
          getFeedDetail(parsedId),
          listFeedComments(parsedId),
            listFeedApplications(parsedId),
          ]);

        if (!isMounted) return;

        if (feedResult.status === "fulfilled") {
          setFeed(feedResult.value);
          setBaseVotes(feedResult.value.likeCount ?? 0);
          setVotes(feedResult.value.likeCount ?? 0);
        } else {
          throw feedResult.reason;
        }

        if (commentResult.status === "fulfilled") {
          setComments(commentResult.value);
        } else {
          setComments([]);
        }

        if (applicationResult.status === "fulfilled") {
          setApplications(applicationResult.value);
          setIsOwner(true);
        } else {
          setApplications([]);
          setIsOwner(false);
        }
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "피드를 불러오지 못했습니다."
        );
        setFeed(null);
        setComments([]);
        setApplications([]);
        setIsOwner(false);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFeed();
    return () => {
      isMounted = false;
    };
  }, [authLoading, isLoggedIn, params?.id]);

  useEffect(() => {
    setBaseVotes(0);
    setVotes(0);
    setVoted(null);
  }, [feed?.feedId]);

  const requireLogin = useCallback(() => {
    if (isLoggedIn) return true;
    alert("로그인이 필요한 기능입니다");
    openModal();
    return false;
  }, [isLoggedIn, openModal]);

  const handleCommentSubmit = () => {
    if (!requireLogin()) return;
    const content = commentText.trim();
    if (!content || !feed) return;

    setIsSubmittingComment(true);
    addFeedComment(feed.feedId, { content })
      .then((created) => {
        setComments((prev) => [created, ...prev]);
        setCommentText("");
      })
      .catch(() => {
        alert("댓글 작성에 실패했습니다.");
      })
      .finally(() => {
        setIsSubmittingComment(false);
      });
  };

  const handleApplyToTeam = () => {
    if (!requireLogin()) return;
    if (!feed) return;
    const stack = window.prompt("참가 희망 포지션/스택을 입력해주세요.");
    if (!stack || !stack.trim()) return;

    setIsApplying(true);
    applyToFeed(feed.feedId, { stack: stack.trim() })
      .then(() => {
        alert("참가 신청이 접수되었습니다.");
      })
      .catch(() => {
        alert("참가 신청에 실패했습니다.");
      })
      .finally(() => {
        setIsApplying(false);
      });
  };

  const updateApplicationStatus = (
    applicationId: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.applicationId === applicationId ? { ...app, status } : app
      )
    );
  };

  const handleApproveApplication = (applicationId: number) => {
    if (!feed) return;
    setProcessingApplicationIds((prev) => [...prev, applicationId]);
    approveFeedApplication(feed.feedId, applicationId)
      .then(() => {
        updateApplicationStatus(applicationId, "APPROVED");
        alert("신청을 승인했습니다.");
      })
      .catch(() => {
        alert("승인 처리에 실패했습니다.");
      })
      .finally(() => {
        setProcessingApplicationIds((prev) =>
          prev.filter((id) => id !== applicationId)
        );
      });
  };

  const handleRejectApplication = (applicationId: number) => {
    if (!feed) return;
    setProcessingApplicationIds((prev) => [...prev, applicationId]);
    rejectFeedApplication(feed.feedId, applicationId)
      .then(() => {
        updateApplicationStatus(applicationId, "REJECTED");
        alert("신청을 거절했습니다.");
      })
      .catch(() => {
        alert("거절 처리에 실패했습니다.");
      })
      .finally(() => {
        setProcessingApplicationIds((prev) =>
          prev.filter((id) => id !== applicationId)
        );
      });
  };
  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              피드를 불러오는 중입니다...
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <LogIn className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                피드를 보려면 로그인이 필요합니다.
              </p>
              <Button className="mt-4" onClick={() => openModal()}>
                <LogIn className="mr-2 h-4 w-4" />
                로그인하기
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
              {errorMessage}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!feed) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              피드 정보를 찾을 수 없습니다.
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryTag = CATEGORY_LABELS[feed.category] ?? "기타";
  const strengths = [feed.strength1, feed.strength2].filter(
    (value): value is string => Boolean(value && value.trim())
  );
  const improvements = [feed.improvements1, feed.improvements2].filter(
    (value): value is string => Boolean(value && value.trim())
  );
  const strengthItems =
    strengths.length > 0 ? strengths : ["강점 정보가 제공되지 않았습니다."];
  const improvementItems =
    improvements.length > 0 ? improvements : ["보완점 정보가 제공되지 않았습니다."];
  const teamMembers: TeamMember[] =
    feed.members?.map((member, index) => ({
      name: member.name ?? `팀원${index + 1}`,
      role: member.role ?? member.stack ?? "참여자",
      profileImageUrl: member.profileImageUrl,
    })) ?? [];
  const positions: FeedPositionStatusResponse[] = feed.positions ?? [];

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
                            ? baseVotes
                            : baseVotes + 1
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
                            ? baseVotes
                            : baseVotes - 1
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
                      {feed.title}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {feed.authorName}
                      </span>
                      <span>|</span>
                      <span>{formatDate(feed.createdAt)}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {[categoryTag].map((tag) => (
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
                      {feed.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      타겟 고객
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feed.targetCustomer}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      해결 방안
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feed.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      차별성
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feed.differentiation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <MessageCircle className="h-5 w-5" />
                  댓글 ({comments.length})
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
                      <Button
                        size="sm"
                        disabled={!commentText.trim() || isSubmittingComment}
                        onClick={handleCommentSubmit}
                      >
                        <Send className="mr-1.5 h-3.5 w-3.5" />
                        댓글 작성
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.commentId}
                      className="flex gap-3 rounded-lg border border-border p-4"
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                    {comment.authorProfileImageUrl && (
                      <AvatarImage
                        src={comment.authorProfileImageUrl}
                        alt={comment.authorName}
                      />
                    )}
                        <AvatarFallback className="bg-secondary text-xs">
                      {comment.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">
                            {comment.authorName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <div className="rounded-lg border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                      아직 등록된 댓글이 없습니다.
                    </div>
                  )}
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
                      score={feed.totalScore ?? 0}
                      size={120}
                      strokeWidth={9}
                      label="종합 점수"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { label: "시장성", value: feed.marketScore ?? 0 },
                      { label: "혁신성", value: feed.innovationScore ?? 0 },
                      { label: "실현가능", value: feed.feasibilityScore ?? 0 },
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
                      {strengthItems.map((s) => (
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
                      {improvementItems.map((imp) => (
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
                    {teamMembers.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center gap-3"
                      >
                        <Avatar className="h-8 w-8">
                          {member.profileImageUrl && (
                            <AvatarImage
                              src={member.profileImageUrl}
                              alt={member.name}
                            />
                          )}
                          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                            {member.name.charAt(0)}
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
                    {teamMembers.length === 0 && (
                      <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
                        팀 멤버 정보가 없습니다.
                      </div>
                    )}
                  </div>

                  {isOwner && (
                    <div className="mt-4 border-t border-border pt-4">
                      <h3 className="mb-2 text-xs font-semibold text-foreground">
                        팀 신청자
                      </h3>
                      <div className="flex flex-col gap-2">
                        {applications.map((application) => {
                          const isProcessing =
                            processingApplicationIds.includes(
                              application.applicationId
                            );
                          const isPending =
                            application.status === "PENDING" && !isProcessing;

                          return (
                            <div
                              key={application.applicationId}
                              className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  {application.applicantProfileImageUrl && (
                                    <AvatarImage
                                      src={application.applicantProfileImageUrl}
                                      alt={application.applicantName}
                                    />
                                  )}
                                  <AvatarFallback className="bg-secondary text-xs">
                                    {application.applicantName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium text-foreground">
                                    {application.applicantName}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {application.stack} ·{" "}
                                    {formatDate(application.createdAt)}
                                  </div>
                                </div>
                              </div>
                              {application.status === "PENDING" ? (
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    disabled={!isPending}
                                    onClick={() =>
                                      handleApproveApplication(
                                        application.applicationId
                                      )
                                    }
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    disabled={!isPending}
                                    onClick={() =>
                                      handleRejectApplication(
                                        application.applicationId
                                      )
                                    }
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  {application.status === "APPROVED"
                                    ? "승인됨"
                                    : "거절됨"}
                                </span>
                              )}
                            </div>
                          );
                        })}
                        {applications.length === 0 && (
                          <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
                            아직 신청자가 없습니다.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 border-t border-border pt-4">
                    <h3 className="mb-2 text-xs font-semibold text-foreground">
                      모집 중인 역할
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {positions.map((position) => (
                        <Badge
                          key={position.stack}
                          variant="outline"
                          className="text-xs"
                        >
                          {position.stack} : {position.remaining}명
                        </Badge>
                      ))}
                      {positions.length === 0 && (
                        <span className="text-xs text-muted-foreground">
                          모집 포지션 정보가 없습니다.
                        </span>
                      )}
                    </div>
                  </div>

                  {!isOwner && (
                    <Button
                      className="mt-4 w-full"
                      size="sm"
                      onClick={handleApplyToTeam}
                      disabled={isApplying}
                    >
                      <UserPlus className="mr-1.5 h-4 w-4" />
                      팀 참가 신청
                    </Button>
                  )}
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
