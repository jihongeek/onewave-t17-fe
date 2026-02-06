// Idea & AI Analysis Types - Based on swagger.json

// ==================== Enums ====================
export type IdeaCategory =
  | 'HEALTHCARE'
  | 'FINTECH'
  | 'EDUTECH'
  | 'ECOMMERCE'
  | 'SAAS'
  | 'SOCIAL'
  | 'OTHER';

export type IdeaStage = 'IDEA' | 'PROTOTYPE' | 'MVP' | 'LAUNCHED';

// ==================== Request Types ====================
export interface IdeaCreateRequest {
  title: string;
  problem: string;
  targetCustomer: string;
  solution: string;
  differentiation: string;
  category: IdeaCategory;
  stage: IdeaStage;
}

export interface FeedCreateRequest {
  ideaId: number;
  positions: {
    stack: string;
    capacity: number;
  }[];
}

// ==================== Response Types ====================
export interface IdeaResponse {
  ideaId: number;
  title: string;
  problem: string;
  targetCustomer: string;
  solution: string;
  differentiation: string;
  category: IdeaCategory;
  stage: IdeaStage;
  createdAt: string;
}

export interface AiAnalysisResponse {
  analysisId: number;
  ideaId: number;
  marketScore: number;
  innovationScore: number;
  feasibilityScore: number;
  totalScore: number;
  strength1?: string;
  strength2?: string;
  improvements1?: string;
  improvements2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedDetailResponse {
  feedId: number;
  title: string;
  problem: string;
  targetCustomer: string;
  solution: string;
  differentiation: string;
  category: IdeaCategory;
  stage: IdeaStage;
  authorName: string;
  likeCount: number;
  likedByMe: boolean;
  marketScore: number;
  innovationScore: number;
  feasibilityScore: number;
  totalScore: number;
  strength1?: string;
  strength2?: string;
  improvements1?: string;
  improvements2?: string;
  createdAt: string;
}

export interface FeedListItemResponse {
  feedId: number;
  title: string;
  problem: string;
  category: IdeaCategory;
  authorName: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  totalScore: number;
  likedByMe: boolean;
}
