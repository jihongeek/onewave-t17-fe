// 로드맵 API 관련 타입 및 함수 (swagger.json 기반)

// === Types ===

export interface RoadmapCreateRequest {
  teamSize: string;
  budget: string;
  timeline: string;
  priority: string;
}

export interface RoadmapResponse {
  roadmapId: number;
  teamSize: string;
  budget: string;
  timeline: string;
  priority: string;
  createdAt: string;
}

// === API Functions ===

const API_BASE_URL = '';

function getAuthHeader(): Record<string, string> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * 로드맵 목록 조회 (현재 사용자)
 * GET /api/roadmaps
 */
export async function listRoadmaps(): Promise<RoadmapResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/roadmaps`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error('로드맵 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
}

/**
 * 로드맵 생성
 * POST /api/roadmaps
 */
export async function createRoadmap(
  data: RoadmapCreateRequest
): Promise<RoadmapResponse> {
  const response = await fetch(`${API_BASE_URL}/api/roadmaps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('로드맵 생성에 실패했습니다.');
  }

  return response.json();
}

/**
 * 로드맵 상세 조회
 * GET /api/roadmaps/{roadmapId}
 */
export async function getRoadmap(roadmapId: number): Promise<RoadmapResponse> {
  const response = await fetch(`${API_BASE_URL}/api/roadmaps/${roadmapId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error('로드맵을 불러오는데 실패했습니다.');
  }

  return response.json();
}

/**
 * 로드맵 삭제
 * DELETE /api/roadmaps/{roadmapId}
 */
export async function deleteRoadmap(roadmapId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/roadmaps/${roadmapId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error('로드맵 삭제에 실패했습니다.');
  }
}
