import { useAuthStore } from "@/features/auth/store";
import axios from "axios";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : false;
  } catch {
    return true;
  }
};

// Setup automatic token validation
export const setupTokenValidation = () => {
  const checkTokenExpiration = () => {
    const { token, clearToken } = useAuthStore.getState();

    if (token && isTokenExpired(token)) {
      clearToken();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
    }
  };

  // Check every minute
  const interval = setInterval(checkTokenExpiration, 60000);

  // Also check on page focus (when user returns to tab)
  window.addEventListener("focus", checkTokenExpiration);

  // Return cleanup function
  return () => {
    clearInterval(interval);
    window.removeEventListener("focus", checkTokenExpiration);
  };
};

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    // Check if token is expired before making request
    if (isTokenExpired(token)) {
      const { clearToken } = useAuthStore.getState();
      clearToken();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
      return Promise.reject(new Error("Token expired"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      const { clearToken } = useAuthStore.getState();
      clearToken();

      // Show notification
      toast.error("Session expired. Please login again.");

      // Redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
