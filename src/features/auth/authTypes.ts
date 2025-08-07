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
