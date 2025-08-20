import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../roleService";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};