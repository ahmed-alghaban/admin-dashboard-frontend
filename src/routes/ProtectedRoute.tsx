import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import AppLayout from '@/components/shared/AppLayout';

export const ProtectedRoute = () => {
    const token = useAuthStore((s) => s.token);
    return token ? <AppLayout /> : <Navigate to="/" />;
};
