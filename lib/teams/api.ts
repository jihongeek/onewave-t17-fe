// Teams API 함수 (swagger.json 기반)

// === Types ===

export interface MyTeamResponse {
  feedId: number;
  ideaTitle: string;
  ownerName: string;
  stack: string;
  joinedAt: string;
}

// === API Functions ===

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://onewave.syu-likelion.org';

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * 내가 참여한 팀 목록 조회
 * GET /api/users/me/teams
 */
export async function listMyTeams(): Promise<MyTeamResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/users/me/teams`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('팀 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
}
