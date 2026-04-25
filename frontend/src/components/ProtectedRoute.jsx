import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../features/profile/hooks/useMe";
import { LoadingScreen } from "./LoadingScreen";

export function ProtectedRoute() {
    const { data: me, isLoading, isError } = useMe();

    if (isLoading) return <LoadingScreen />

    if (isError || !me)
        return <Navigate to="/Login" replace />;

    return <Outlet />;
}