import { useMutation } from "@tanstack/react-query";
import { editUser } from "../userService";
import type { UserUpdateDto } from "../userTypes";
import { queryClient } from "@/lib/queryClient";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useEditUser = () => {
    return useMutation({
        mutationFn: ({ userId, user }: { userId: string; user: UserUpdateDto }) => editUser(userId, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: AxiosError) => {
            logger.error(error);
            const errorData = error.response?.data as {
                errors?: Record<string, string[]>;
                title?: string;
                message?: string;
            } | undefined;

            // Handle validation errors from the API
            if (errorData?.errors) {
                const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .filter((msg: string) => typeof msg === 'string')
                    .join(', ');
                toast.error(errorMessages || 'Validation failed');
            } else {
                // Fallback to other error formats
                const message: string = errorData?.title || errorData?.message || error.message || 'Failed to add user';
                toast.error(message);
            }
        },
    });
};