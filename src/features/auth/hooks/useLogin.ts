import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/auth/authService';
import { type LoginInput } from '@/features/auth/authTypes';
import { useAuthStore } from '@/features/auth/store';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { logger } from '@/lib/logger';
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
    const setToken = useAuthStore((s) => s.setToken);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginInput) => login(data),
        onSuccess: (data) => {
            setToken(data.token);
            toast.success('Login successful');
            navigate('/app/dashboard');
        },
        onError: (error: AxiosError) => {
            logger.error(error);
            const message: string = error.response?.data?.toString() || 'Login failed';
            toast.error(message);
        },
        throwOnError: false,
        retry: false,
    });
};
