
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getUsers } from "../userService";
import type { User } from "../userTypes";

export const useUsers = () => {
    return useQuery<User[], AxiosError>({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};
