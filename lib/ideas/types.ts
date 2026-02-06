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
