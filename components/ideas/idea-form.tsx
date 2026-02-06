"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2, X } from "lucide-react";
import type { IdeaCreateRequest } from "@/lib/ideas/types";

interface IdeaFormProps {
  onAnalyze: (data: IdeaCreateRequest) => void;
  isAnalyzing: boolean;
  onPublish: (positions: { stack: string; capacity: number }[]) => void;
  onPrivate: () => void;
  isPublishDisabled?: boolean;
  showPublishActions?: boolean;
}

export function IdeaForm({
  onAnalyze,
  isAnalyzing,
  onPublish,
  onPrivate,
  isPublishDisabled = false,
  showPublishActions = false,
}: IdeaFormProps) {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [solution, setSolution] = useState("");
  const [differentiation, setDifferentiation] = useState("");
  const [category, setCategory] =
    useState<IdeaCreateRequest["category"]>("HEALTHCARE");
  const [stage, setStage] = useState<IdeaCreateRequest["stage"]>("IDEA");
  const [positions, setPositions] = useState<
    { stack: string; capacity: number }[]
  >([]);
  const [positionStack, setPositionStack] = useState("");
  const [positionCapacity, setPositionCapacity] = useState("1");

  const handleAddPosition = () => {
    const trimmedStack = positionStack.trim();
    const parsedCapacity = Number(positionCapacity);
    if (!trimmedStack || Number.isNaN(parsedCapacity) || parsedCapacity < 1) {
      return;
    }
    setPositions((prev) => {
      const existingIndex = prev.findIndex(
        (position) =>
          position.stack.toLowerCase() === trimmedStack.toLowerCase()
      );
      if (existingIndex >= 0) {
        return prev.map((position, index) =>
          index === existingIndex
            ? { ...position, capacity: position.capacity + parsedCapacity }
            : position
        );
      }
      return [...prev, { stack: trimmedStack, capacity: parsedCapacity }];
    });
    setPositionStack("");
    setPositionCapacity("1");
  };

  const handleRemovePosition = (stackToRemove: string) => {
    setPositions((prev) =>
      prev.filter((position) => position.stack !== stackToRemove)
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <h2 className="mb-6 text-lg font-semibold text-foreground">
        아이디어 정보
      </h2>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          onAnalyze({
            title: title.trim(),
            problem: problem.trim(),
            targetCustomer: targetCustomer.trim(),
            solution: solution.trim(),
            differentiation: differentiation.trim(),
            category,
            stage,
          });
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">아이디어 제목</Label>
          <Input
            id="title"
            placeholder="예: AI로 맞춤형 식단을 추천하는 앱"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="problem">해결하려는 문제</Label>
          <Textarea
            id="problem"
            placeholder="예: 바쁜 직장인이 식단 관리를 지속하기 어려움"
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="target">타겟 고객</Label>
          <Input
            id="target"
            placeholder="예: 20~40대 직장인, 건강 관리 니즈가 있는 사용자"
            value={targetCustomer}
            onChange={(e) => setTargetCustomer(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="solution">해결 방안</Label>
          <Textarea
            id="solution"
            placeholder="예: 개인 선호와 건강 데이터를 기반으로 식단/운동을 제안"
            rows={3}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="differentiator">차별성</Label>
          <Textarea
            id="differentiator"
            placeholder="예: 실시간 피드백과 챌린지 기능으로 지속 사용 유도"
            rows={3}
            value={differentiation}
            onChange={(e) => setDifferentiation(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>카테고리</Label>
            <Select
              value={category}
              onValueChange={(value) =>
                setCategory(value as IdeaCreateRequest["category"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HEALTHCARE">헬스케어</SelectItem>
                <SelectItem value="FINTECH">핀테크</SelectItem>
                <SelectItem value="EDUTECH">에듀테크</SelectItem>
                <SelectItem value="ECOMMERCE">이커머스</SelectItem>
                <SelectItem value="SAAS">SaaS</SelectItem>
                <SelectItem value="SOCIAL">소셜</SelectItem>
                <SelectItem value="OTHER">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>단계</Label>
            <Select
              value={stage}
              onValueChange={(value) =>
                setStage(value as IdeaCreateRequest["stage"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IDEA">아이디어 단계</SelectItem>
                <SelectItem value="PROTOTYPE">프로토타입</SelectItem>
                <SelectItem value="MVP">MVP</SelectItem>
                <SelectItem value="LAUNCHED">출시 완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="position-stack">필요한 직군</Label>
          <div className="grid gap-2 sm:grid-cols-[1fr_120px_auto]">
            <Input
              id="position-stack"
              placeholder="예: Frontend"
              value={positionStack}
              onChange={(e) => setPositionStack(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddPosition();
                }
              }}
            />
            <Input
              id="position-capacity"
              type="number"
              min={1}
              placeholder="인원"
              value={positionCapacity}
              onChange={(e) => setPositionCapacity(e.target.value)}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddPosition}
              disabled={!positionStack.trim() || !positionCapacity.trim()}
            >
              추가
            </Button>
          </div>
          {positions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {positions.map((position) => (
                <span
                  key={position.stack}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground"
                >
                  {position.stack} · {position.capacity}명
                  <button
                    type="button"
                    onClick={() => handleRemovePosition(position.stack)}
                    className="rounded-full p-0.5 text-muted-foreground transition hover:text-foreground"
                    aria-label={`${position.stack} 삭제`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              아직 추가된 직군이 없습니다. 공개 시 필요한 포지션을 등록해 주세요.
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-2"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              AI 분석 중...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              AI 분석 요청
            </>
          )}
        </Button>

        {showPublishActions && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={onPrivate}
              disabled={isAnalyzing}
            >
              비공개
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => onPublish(positions)}
              disabled={isPublishDisabled}
            >
              공개
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
