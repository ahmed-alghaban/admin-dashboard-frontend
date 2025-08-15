import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../userService";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import type { AxiosError } from "axios";

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addUser,
        onSuccess: (data) => {
            logger.log(data);
            toast.success("User added successfully");
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