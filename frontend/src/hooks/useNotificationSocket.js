import { useEffect, useState } from 'react';
import { echo } from '../utils/echo';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../features/profile/hooks/useMe';

export function useNotificationSocket() {
    const queryClient = useQueryClient();
    const { data: me } = useMe();
    const [notifications, setNotifications] = useState([]);

    const myself = me?.data;

    useEffect(() => {
        if (!myself?.id) return;

        const channel = echo.private(`user.${myself.id}`);

        channel.listen('.request.received', (e) => {
            queryClient.invalidateQueries(['received_requests']);
            
            const newNotification = {
                id: Date.now(), // Unique ID is key for React
                message: `New friend request from ${e.senderData.username}`,
                imageRoute: e.senderData.profile_image_route || "/brand/icons/avatar.webp",
                redirectTo: "/Users"
            };

            //ADD EACH NOTIFICATION TO THE LIST
            setNotifications((prev) => [...prev, newNotification]);
        });

        return () => echo.leave(`user.${myself.id}`);
    }, [myself?.id, queryClient]);

    //REMOVE A NOTIFICATION ONCE IT'S DISMISSED
    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter(n => n.id !== id));
    };

    return { notifications, removeNotification };
}