export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  firstName: string;
  email: string;
  role: Role;
  ip: string;
  image: string | null;
  lastName: string | null;
  createdAt: string;
}

export interface RegisterUserDto {
  email: string;
  password: string;
  emailVerificationCode: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface User {}
