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

export interface FeedCommentRequest {
  content: string;
}

export interface FeedApplyRequest {
  stack: string;
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
  members?: FeedMemberResponse[];
  positions?: FeedPositionStatusResponse[];
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

export interface FeedMemberResponse {
  memberId?: number;
  name?: string;
  role?: string;
  profileImageUrl?: string;
  stack?: string;
}

export interface FeedPositionStatusResponse {
  stack: string;
  capacity: number;
  filled: number;
  remaining: number;
}

export interface FeedCommentResponse {
  commentId: number;
  authorName: string;
  authorProfileImageUrl?: string;
  createdAt: string;
  content: string;
}

export interface MessageResponse {
  message?: string;
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
