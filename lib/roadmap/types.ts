// 로드맵 관련 타입 정의

export type TeamSize = 'solo' | 'small' | 'team';
export type Budget = 'zero' | 'low' | 'mid';
export type Period = '1month' | '3months' | '6months';
export type Priority = 'validation' | 'team' | 'funding';

export interface RoadmapFormData {
  teamSize: TeamSize;
  budget: Budget;
  period: Period;
  priority: Priority;
}

export interface RoadmapTask {
  title: string;
  duration: string;
  description?: string;
  tools?: { name: string; url: string }[];
}

export interface RoadmapDay {
  day: string;
  tasks: RoadmapTask[];
}

export interface RoadmapWeek {
  week: number;
  title: string;
  goal: string;
  days: RoadmapDay[];
  summary: string[];
  tips?: string[];
  estimatedCost: number;
}

export interface Roadmap {
  id: string;
  caseKey: string;
  title: string;
  description: string;
  weeks: RoadmapWeek[];
  totalCost: number;
  createdAt?: string;
}

export interface SavedRoadmap extends Roadmap {
  savedAt: string;
  formData: RoadmapFormData;
}

// 케이스 키 생성 함수
export function getCaseKey(formData: RoadmapFormData): string {
  return `${formData.teamSize}_${formData.budget}_${formData.period}`;
}

// 폼 옵션 레이블
export const TEAM_SIZE_OPTIONS = [
  { value: 'solo' as const, label: '혼자', description: '1인 창업' },
  { value: 'small' as const, label: '2-3명', description: '소규모 팀' },
  { value: 'team' as const, label: '4명 이상', description: '팀 창업' },
];

export const BUDGET_OPTIONS = [
  { value: 'zero' as const, label: '0원', description: '부트스트래핑' },
  { value: 'low' as const, label: '10만원 이하', description: '최소 비용' },
  { value: 'mid' as const, label: '100만원 이하', description: '적정 투자' },
];

export const PERIOD_OPTIONS = [
  { value: '1month' as const, label: '1개월', description: '빠른 검증' },
  { value: '3months' as const, label: '3개월', description: '안정적 진행' },
  { value: '6months' as const, label: '6개월', description: '체계적 성장' },
];

export const PRIORITY_OPTIONS = [
  {
    value: 'validation' as const,
    label: '아이디어 검증',
    description: 'AI 분석으로 아이디어 검증',
  },
  { value: 'team' as const, label: '팀 구성', description: '함께할 팀원 찾기' },
  {
    value: 'funding' as const,
    label: '자금 조달',
    description: '초기 자금 확보',
  },
];
