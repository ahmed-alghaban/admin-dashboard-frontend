import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/authService";
import { useAuthStore } from "@/features/auth/store";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            useAuthStore.setState({ token: data.token });
        },
    });
};