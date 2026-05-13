import { User, AuthTokens, LoginResponse, LoginPayload, RegisterPayload, BackendFavorite } from './auth-types';
import type { Language } from './types';

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
).replace(/\/+$/, '');

const TOKEN_KEY = 'visitkhorezm_auth';

// ═════════════════════════════════════════════════════════════
// TOKEN STORAGE
// ═════════════════════════════════════════════════════════════
export function getStoredTokens(): AuthTokens | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredTokens(tokens: AuthTokens | null) {
  if (typeof window === 'undefined') return;
  try {
    if (tokens) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

// ═════════════════════════════════════════════════════════════
// REQUEST WITH AUTO-REFRESH
// ═════════════════════════════════════════════════════════════
let refreshPromise: Promise<AuthTokens | null> | null = null;

async function refreshAccessToken(): Promise<AuthTokens | null> {
  const tokens = getStoredTokens();
  if (!tokens?.refresh) return null;

  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
      if (!res.ok) {
        setStoredTokens(null);
        return null;
      }
      const data = await res.json();
      const newTokens: AuthTokens = {
        access: data.access,
        refresh: data.refresh || tokens.refresh,
      };
      setStoredTokens(newTokens);
      return newTokens;
    } catch {
      setStoredTokens(null);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function authFetch(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> {
  const tokens = getStoredTokens();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (tokens?.access) {
    headers['Authorization'] = `Bearer ${tokens.access}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  // Token expired - try refresh
  if (res.status === 401 && retry && tokens?.refresh) {
    const newTokens = await refreshAccessToken();
    if (newTokens) {
      return authFetch(path, options, false);
    }
  }

  return res;
}

// ═════════════════════════════════════════════════════════════
// AUTH API
// ═════════════════════════════════════════════════════════════

export async function register(payload: RegisterPayload): Promise<{ success: boolean; user?: User; errors?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, errors: data.errors || data };
    return { success: true, user: data.user, message: data.message };
  } catch (e) {
    return { success: false, errors: { detail: 'Network error' } };
  }
}

export async function login(payload: LoginPayload): Promise<{ success: boolean; data?: LoginResponse; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || "Login xato" };
    }
    setStoredTokens({ access: data.access, refresh: data.refresh });
    return { success: true, data };
  } catch (e) {
    return { success: false, error: 'Network error' };
  }
}

export async function logout() {
  setStoredTokens(null);
}

export async function getProfile(): Promise<User | null> {
  try {
    const res = await authFetch('/auth/me/');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateProfile(data: Partial<User>): Promise<{ success: boolean; user?: User; errors?: any }> {
  try {
    const res = await authFetch('/auth/me/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    const payload = await res.json();
    if (!res.ok) return { success: false, errors: payload };
    return { success: true, user: payload };
  } catch (e) {
    return { success: false, errors: { detail: 'Network error' } };
  }
}

export async function changePassword(old_password: string, new_password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await authFetch('/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify({ old_password, new_password }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || JSON.stringify(data.errors) };
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Network error' };
  }
}

// ═════════════════════════════════════════════════════════════
// FAVORITES (synced with backend)
// ═════════════════════════════════════════════════════════════

export async function getBackendFavorites(): Promise<BackendFavorite[]> {
  try {
    const res = await authFetch('/auth/favorites/');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || []);
  } catch {
    return [];
  }
}

export async function toggleBackendFavorite(favorite_type: string, object_id: number): Promise<{ success: boolean; action?: 'added' | 'removed' }> {
  try {
    const res = await authFetch('/auth/favorites/toggle/', {
      method: 'POST',
      body: JSON.stringify({ favorite_type, object_id }),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}
