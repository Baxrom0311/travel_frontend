import { Language } from './types';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar_url: string | null;
  phone: string;
  country: string;
  bio: string;
  language: Language;
  is_verified: boolean;
  created_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface RegisterPayload {
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  language?: Language;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface BackendFavorite {
  id: number;
  favorite_type: 'hotel' | 'attraction' | 'restaurant' | 'tour' | 'event';
  object_id: number;
  created_at: string;
}

export interface ApiError {
  success: false;
  error?: string;
  message?: string;
  errors?: Record<string, string[] | string>;
  detail?: string;
}
