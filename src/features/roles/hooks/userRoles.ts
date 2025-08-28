import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../roleService.ts";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};
