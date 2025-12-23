export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  groupNumber: string;
  variant: number;
}

export interface AuthResponse {
  token: string;
  username: string;
  fullName: string;
  groupNumber: string;
  variant: number;
}


