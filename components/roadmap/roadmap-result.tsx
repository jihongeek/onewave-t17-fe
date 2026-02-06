'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CheckCircle2,
  Calendar,
  Target,
  Lightbulb,
  ExternalLink,
  RotateCcw,
  Save,
  Download,
  Loader2,
} from 'lucide-react';
import type { Roadmap, RoadmapFormData, SavedRoadmap } from '@/lib/roadmap';

interface RoadmapResultProps {
  roadmap: Roadmap;
  formData: RoadmapFormData;
  onReset: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  isSaved?: boolean;
}

export function RoadmapResult({
  roadmap,
  formData,
  onReset,
  onSave,
  isSaving,
  isSaved,
}: RoadmapResultProps) {
  const [openWeeks, setOpenWeeks] = useState<string[]>(['week-1']);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            {roadmap.title}
          </h2>
          <p className="mt-2 text-muted-foreground">{roadmap.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">
              {formData.teamSize === 'solo'
                ? '솔로'
                : formData.teamSize === 'small'
                  ? '2-3명'
                  : '4명+'}
            </Badge>
            <Badge variant="outline">
              {formData.budget === 'zero'
                ? '0원'
                : formData.budget === 'low'
                  ? '10만원 이하'
                  : '100만원 이하'}
            </Badge>
            <Badge variant="outline">
              {formData.period === '1month'
                ? '1개월'
                : formData.period === '3months'
                  ? '3개월'
                  : '6개월'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="mr-1.5 h-4 w-4" />
            다시 만들기
          </Button>
          {onSave && (
            <Button size="sm" onClick={onSave} disabled={isSaving || isSaved}>
              {isSaving ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : isSaved ? (
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
              ) : (
                <Save className="mr-1.5 h-4 w-4" />
              )}
              {isSaving ? '저장 중...' : isSaved ? '저장됨' : '저장하기'}
            </Button>
          )}
        </div>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            로드맵 요약
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.weeks.map(week => (
              <div
                key={week.week}
                className="rounded-lg border border-border bg-accent/30 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{week.week}주차</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {week.title}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-primary/5 p-4">
            <span className="font-medium">예상 총 비용</span>
            <span className="text-xl font-bold text-primary">
              {roadmap.totalCost === 0
                ? '무료'
                : `${roadmap.totalCost.toLocaleString()}원`}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Details */}
      <Accordion
        type="multiple"
        value={openWeeks}
        onValueChange={setOpenWeeks}
        className="space-y-4"
      >
        {roadmap.weeks.map(week => (
          <AccordionItem
            key={week.week}
            value={`week-${week.week}`}
            className="rounded-xl border border-border bg-card"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex flex-1 items-center justify-between pr-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    {week.week}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{week.title}</h3>
                    <p className="text-sm text-muted-foreground">{week.goal}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="hidden sm:flex">
                  {week.estimatedCost === 0
                    ? '무료'
                    : `${week.estimatedCost.toLocaleString()}원`}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {/* Daily Tasks */}
                {week.days.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="mb-3 font-semibold text-primary">
                      {day.day}
                    </h4>
                    <ul className="space-y-3">
                      {day.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{task.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {task.duration}
                              </Badge>
                            </div>
                            {task.description && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {task.description}
                              </p>
                            )}
                            {task.tools && task.tools.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {task.tools.map((tool, toolIdx) => (
                                  <Link
                                    key={toolIdx}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/80 hover:text-foreground"
                                  >
                                    {tool.name}
                                    <ExternalLink className="h-3 w-3" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Week Summary */}
                <div className="rounded-lg bg-accent/50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    주차 목표
                  </h4>
                  <ul className="space-y-1">
                    {week.summary.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                {week.tips && week.tips.length > 0 && (
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <Lightbulb className="h-4 w-4" />팁
                    </h4>
                    <ul className="space-y-1">
                      {week.tips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-amber-700 dark:text-amber-300"
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <h3 className="text-xl font-bold">준비됐나요? 🚀</h3>
          <p className="text-muted-foreground">
            AI와 함께 아이디어를 검증하고 첫 번째 단계를 시작하세요!
          </p>
          <Button size="lg" asChild>
            <Link href="/ideas/new">AI 분석 시작하기</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
