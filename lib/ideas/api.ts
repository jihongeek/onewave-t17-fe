// Idea & AI Analysis API Functions - Based on swagger.json
import type {
  AiAnalysisResponse,
  FeedApplyRequest,
  FeedApplicationResponse,
  FeedCommentRequest,
  FeedCommentResponse,
  FeedCreateRequest,
  FeedDetailResponse,
  FeedListItemResponse,
  IdeaCreateRequest,
  IdeaResponse,
  MessageResponse,
} from './types';

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
 * 내 아이디어 목록 조회
 * GET /api/ideas
 */
export async function listMyIdeas(): Promise<IdeaResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/ideas`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<IdeaResponse[]>(response);
}

/**
 * 내 아이디어 단건 조회
 * GET /api/ideas/{ideaId}
 */
export async function getMyIdea(ideaId: number): Promise<IdeaResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ideas/${ideaId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<IdeaResponse>(response);
}

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
export async function analyzeIdea(ideaId: number): Promise<AiAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ideas/${ideaId}/analysis`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  return handleResponse<AiAnalysisResponse>(response);
}

/**
 * 아이디어 AI 분석 결과 조회
 * GET /api/ideas/{ideaId}/analysis
 */
export async function getAnalysis(ideaId: number): Promise<AiAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ideas/${ideaId}/analysis`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<AiAnalysisResponse>(response);
}

// ==================== Feed API ====================

/**
 * 피드 공개 등록
 * POST /api/feeds
 */
export async function createFeed(
  data: FeedCreateRequest
): Promise<FeedDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/api/feeds`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<FeedDetailResponse>(response);
}

/**
 * 피드 목록 조회 (공개 API - 로그인 없이도 조회 가능)
 * GET /api/feeds
 */
export async function listFeeds(): Promise<FeedListItemResponse[]> {
  // 토큰이 있으면 포함 (likedByMe 정보를 위해), 없으면 공개 조회
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // 토큰이 있을 때만 Authorization 헤더 추가
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/feeds`, {
    method: 'GET',
    headers,
  });
  return handleResponse<FeedListItemResponse[]>(response);
}

/**
 * 피드 상세 조회
 * GET /api/feeds/{feedId}
 */
export async function getFeedDetail(
  feedId: number
): Promise<FeedDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<FeedDetailResponse>(response);
}

/**
 * 피드 댓글 목록 조회
 * GET /api/feeds/{feedId}/comments
 */
export async function listFeedComments(
  feedId: number
): Promise<FeedCommentResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}/comments`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<FeedCommentResponse[]>(response);
}

/**
 * 피드 댓글 작성
 * POST /api/feeds/{feedId}/comments
 */
export async function addFeedComment(
  feedId: number,
  data: FeedCommentRequest
): Promise<FeedCommentResponse> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}/comments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<FeedCommentResponse>(response);
}

/**
 * 팀 참가 신청
 * POST /api/feeds/{feedId}/applications
 */
export async function applyToFeed(
  feedId: number,
  data: FeedApplyRequest
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}/applications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}

/**
 * 팀 신청자 목록 조회 (피드 소유자 전용)
 * GET /api/feeds/{feedId}/applications
 */
export async function listFeedApplications(
  feedId: number
): Promise<FeedApplicationResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}/applications`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<FeedApplicationResponse[]>(response);
}

/**
 * 팀 신청 승인
 * POST /api/feeds/{feedId}/applications/{applicationId}/approve
 */
export async function approveFeedApplication(
  feedId: number,
  applicationId: number
): Promise<MessageResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/feeds/${feedId}/applications/${applicationId}/approve`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
    }
  );
  return handleResponse<MessageResponse>(response);
}

/**
 * 팀 신청 거절
 * POST /api/feeds/{feedId}/applications/{applicationId}/reject
 */
export async function rejectFeedApplication(
  feedId: number,
  applicationId: number
): Promise<MessageResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/feeds/${feedId}/applications/${applicationId}/reject`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
    }
  );
  return handleResponse<MessageResponse>(response);
}

/**
 * 피드 좋아요
 * POST /api/feeds/{feedId}/likes
 */
export async function likeFeed(feedId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}/likes`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  await handleResponse(response);
}

/**
 * 피드 좋아요 취소
 * DELETE /api/feeds/{feedId}/likes
 */
export async function unlikeFeed(feedId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/feeds/${feedId}/likes`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleResponse(response);
}
