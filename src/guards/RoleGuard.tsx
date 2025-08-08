import type { RoleGuardProps } from "@/features/auth/authTypes";
import { getRoleFromToken } from "@/lib/getRoleFromToken";
import { Navigate } from "react-router-dom";

export const RoleGuard = ({ roles, children }: RoleGuardProps) => {
    const role = getRoleFromToken();

    if (!role || !roles.includes(role)) {
        return <Navigate to="/app/403" replace />;
    }

    return <>{children}</>;
}