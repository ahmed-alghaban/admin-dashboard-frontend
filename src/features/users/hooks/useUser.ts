import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getUsers, getUserById } from "../userService";
import type { User } from "../userTypes";

export const useUsers = () => {
  return useQuery<User[], AxiosError>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<User, AxiosError>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
