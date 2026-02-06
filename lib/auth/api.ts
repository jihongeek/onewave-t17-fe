// Auth API Functions - Based on swagger.json
import type {
  LoginRequest,
  SignupRequest,
  EmailRequest,
  EmailVerifyRequest,
  PasswordResetRequest,
  AuthResponse,
  SignupResponse,
  MessageResponse,
  UserResponse,
  UpdateUserRequest,
  ProfileImageUploadResponse,
  ProfileImageUpdateRequest,
} from './types';

// 프록시 설정으로 /api/*는 next.config.mjs에서 백엔드로 리다이렉트됨
const API_BASE_URL = '';

// ==================== Helper Functions ====================
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  // Handle 204 No Content
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

// ==================== Auth API ====================

/**
 * 로그인
 * POST /api/auth/login
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<AuthResponse>(response);
}

/**
 * 회원가입 이메일 인증 코드 요청
 * POST /api/auth/signup/email
 */
export async function requestSignupEmail(
  data: EmailRequest
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}

/**
 * 회원가입 이메일 인증 코드 확인
 * POST /api/auth/signup/email/verify
 */
export async function verifySignupEmail(
  data: EmailVerifyRequest
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup/email/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}

/**
 * 회원가입
 * POST /api/auth/signup
 */
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<SignupResponse>(response);
}

/**
 * 비밀번호 재설정 코드 요청
 * POST /api/auth/password/forgot
 */
export async function requestPasswordReset(
  data: EmailRequest
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/password/forgot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}

/**
 * 비밀번호 재설정
 * POST /api/auth/password/reset
 */
export async function resetPassword(
  data: PasswordResetRequest
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/password/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}

// ==================== User API ====================

/**
 * 내 프로필 조회
 * GET /api/users/me
 */
export async function getMe(): Promise<UserResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse<UserResponse>(response);
}

/**
 * 내 프로필 수정
 * PATCH /api/users/me
 */
export async function updateMe(data: UpdateUserRequest): Promise<UserResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<UserResponse>(response);
}

/**
 * 계정 삭제
 * DELETE /api/users/me
 */
export async function deleteMe(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleResponse<void>(response);
}

/**
 * 비밀번호 변경 이메일 요청 (로그인 상태)
 * POST /api/users/me/password/email
 */
export async function requestPasswordChangeEmail(): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/me/password/email`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  return handleResponse<MessageResponse>(response);
}

/**
 * 비밀번호 변경 (로그인 상태)
 * PATCH /api/users/me/password
 */
export async function changePassword(data: {
  code: string;
  newPassword: string;
}): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/me/password`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}

/**
 * 프로필 이미지 업로드
 * POST /api/users/me/profile-image/upload
 */
export async function uploadProfileImage(
  file: File
): Promise<ProfileImageUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const response = await fetch(
    `${API_BASE_URL}/api/users/me/profile-image/upload`,
    {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    }
  );
  return handleResponse<ProfileImageUploadResponse>(response);
}

/**
 * 프로필 이미지 설정
 * PATCH /api/users/me/profile-image
 */
export async function setProfileImage(
  data: ProfileImageUpdateRequest
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/me/profile-image`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<MessageResponse>(response);
}
