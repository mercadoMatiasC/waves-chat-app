import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../features/profile/hooks/useMe";
import { LoadingScreen } from "./LoadingScreen";
import { useNotificationSocket } from "../hooks/useNotificationSocket";
import { NotificationToast } from "./NotificationToast";

export function ProtectedRoute() {
    const { data: me, isLoading, isError } = useMe();
    const { notifications, removeNotification } = useNotificationSocket();

    if (isLoading) return <LoadingScreen />;
    if (isError || !me) return <Navigate to="/Login" replace />;

    return (
        <>
            <div className="fixed bottom-20 left-3.5 z-50 flex flex-col gap-2 lg:top-0 lg:bottom-5">
                {notifications.map((n) => (
                    <NotificationToast key={n.id} notification={n} onClose={() => removeNotification(n.id)} />
                ))}
            </div>
            <Outlet />
        </>
    );
}