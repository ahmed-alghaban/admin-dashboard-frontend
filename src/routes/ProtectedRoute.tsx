import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';

export const ProtectedRoute = () => {
    const token = useAuthStore((s) => s.token);
    return token ? <Outlet /> : <Navigate to="/app/login" />;
};
