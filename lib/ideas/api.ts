// Idea & AI Analysis API Functions - Based on swagger.json
import type { AiAnalysisResponse, IdeaCreateRequest, IdeaResponse } from './types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://onewave.syu-likelion.org';

// ==================== Helper Functions ====================
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ==================== Idea API ====================

/**
 * 아이디어 생성
 * POST /api/ideas
 */
export async function createIdea(
  data: IdeaCreateRequest
): Promise<IdeaResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ideas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<IdeaResponse>(response);
}

// ==================== AI Analysis API ====================

/**
 * 아이디어 AI 분석 실행
 * POST /api/ideas/{ideaId}/analysis
 */
export async function analyzeIdea(
  ideaId: number
): Promise<AiAnalysisResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/ideas/${ideaId}/analysis`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
    }
  );
  return handleResponse<AiAnalysisResponse>(response);
}

/**
 * 아이디어 AI 분석 결과 조회
 * GET /api/ideas/{ideaId}/analysis
 */
export async function getAnalysis(
  ideaId: number
): Promise<AiAnalysisResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/ideas/${ideaId}/analysis`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );
  return handleResponse<AiAnalysisResponse>(response);
}
