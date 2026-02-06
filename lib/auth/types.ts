// Auth API Types - Based on swagger.json

// ==================== Enums ====================
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

// ==================== Request Types ====================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string; // min: 6, max: 100
  name: string; // max: 100
  birthDate?: string; // format: date (YYYY-MM-DD)
  gender?: Gender;
}

export interface EmailRequest {
  email: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

export interface PasswordResetRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface PasswordChangeRequest {
  code: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  name?: string;
  birthDate?: string; // format: date (YYYY-MM-DD)
  gender?: Gender;
}

export interface ProfileImageUpdateRequest {
  imageUrl: string;
}

// ==================== Response Types ====================
export interface MessageResponse {
  message: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
}

export interface SignupResponse {
  message: string;
}

export interface UserResponse {
  userId: number;
  email: string;
  name: string;
  birthDate?: string;
  gender?: Gender;
  profileImageUrl?: string;
}

export interface ProfileImageUploadResponse {
  imageUrl: string;
}

// ==================== Error Types ====================
export interface ApiError {
  message: string;
  status?: number;
}
