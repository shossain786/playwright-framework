export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string
}

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = 'guest'
}

export interface ApiResponse<T> {
    data: T,
    status: number,
    message?: string,
    success: boolean
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface TestOptions {
  retries?: number;
  timeout?: number;
  tags?: string[];
}

export type Environment = 'dev' | 'staging' | 'prod';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';