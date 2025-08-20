import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getUsers, getUserById } from "../userService";
import type { User, PaginationResult } from "../userTypes";

interface UseUsersParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

export const useUsers = (params: UseUsersParams = {}) => {
  return useQuery<PaginationResult<User>, AxiosError>({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<User, AxiosError>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
