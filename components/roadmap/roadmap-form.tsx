'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Wallet,
  Calendar,
  Target,
} from 'lucide-react';
import {
  TEAM_SIZE_OPTIONS,
  BUDGET_OPTIONS,
  PERIOD_OPTIONS,
  PRIORITY_OPTIONS,
  type RoadmapFormData,
  type TeamSize,
  type Budget,
  type Period,
  type Priority,
} from '@/lib/roadmap';

interface RoadmapFormProps {
  onSubmit: (data: RoadmapFormData) => void;
}

type Step = 'teamSize' | 'budget' | 'period' | 'priority';

const STEPS: {
  key: Step;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'teamSize',
    title: '팀 규모',
    description: '함께 창업할 팀원 수를 선택하세요',
    icon: <Users className="h-5 w-5" />,
  },
  {
    key: 'budget',
    title: '예산',
    description: '초기 투자 가능한 예산을 선택하세요',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    key: 'period',
    title: '기간',
    description: 'MVP 완성까지 목표 기간을 선택하세요',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    key: 'priority',
    title: '우선순위',
    description: '가장 먼저 해결하고 싶은 것을 선택하세요',
    icon: <Target className="h-5 w-5" />,
  },
];

export function RoadmapForm({ onSubmit }: RoadmapFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<RoadmapFormData>>({});

  const currentStepInfo = STEPS[currentStep];

  const getOptions = () => {
    switch (currentStepInfo.key) {
      case 'teamSize':
        return TEAM_SIZE_OPTIONS;
      case 'budget':
        return BUDGET_OPTIONS;
      case 'period':
        return PERIOD_OPTIONS;
      case 'priority':
        return PRIORITY_OPTIONS;
    }
  };

  const getCurrentValue = () => {
    return formData[currentStepInfo.key];
  };

  const handleSelect = (value: string) => {
    setFormData({ ...formData, [currentStepInfo.key]: value });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계 - 제출
      onSubmit(formData as RoadmapFormData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = !!getCurrentValue();
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {currentStepInfo.icon}
        </div>
        <CardTitle className="text-2xl">{currentStepInfo.title}</CardTitle>
        <CardDescription>{currentStepInfo.description}</CardDescription>

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {STEPS.map((step, idx) => (
            <div
              key={step.key}
              className={cn(
                'h-2 w-12 rounded-full transition-colors',
                idx <= currentStep ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Options Grid */}
        <div className="grid gap-3 sm:grid-cols-3">
          {getOptions().map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-6 text-center transition-all hover:border-primary/50',
                getCurrentValue() === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:bg-accent/50'
              )}
            >
              <span className="text-lg font-semibold">{option.label}</span>
              <span className="text-sm text-muted-foreground">
                {option.description}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            이전
          </Button>
          <Button onClick={handleNext} disabled={!canProceed}>
            {isLastStep ? (
              <>
                <Sparkles className="mr-1 h-4 w-4" />
                로드맵 생성
              </>
            ) : (
              <>
                다음
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
