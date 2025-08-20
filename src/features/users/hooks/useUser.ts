import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getUsers, getUserById } from "../userService";
import type { User } from "../userTypes";
import type { PaginationResult } from "@/lib/types";

interface UseUsersParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

export const useUsers = (params: UseUsersParams = {}) => {
  const { pageNumber = 1, pageSize = 10, searchTerm } = params;

  return useQuery<PaginationResult<User>, AxiosError>({
    queryKey: ["users", params],
    queryFn: () => getUsers(pageNumber, pageSize, searchTerm),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<User, AxiosError>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
