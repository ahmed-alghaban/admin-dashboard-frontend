import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../userService";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { logger } from "@/lib/logger";
import { queryClient } from "@/lib/queryClient";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError) => {
      toast.error("Failed to delete user");
      logger.error(error);
    },
  });
};
