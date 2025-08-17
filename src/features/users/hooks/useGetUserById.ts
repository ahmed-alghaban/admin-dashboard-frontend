import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../userService";

export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
    });
};