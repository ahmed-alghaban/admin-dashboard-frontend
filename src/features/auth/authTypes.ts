export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RoleGuardProps {
  roles: string[];
  children: React.ReactNode;
}

export interface JWTPayload {
  nameid: string; // User ID
  name: string; // Full name
  role: string; // User role
  email: string; // User email
  exp: number; // Expiration time
}