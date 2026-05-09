import { useEffect } from 'react';
import { echo } from "../../../utils/echo"
import { useQueryClient } from '@tanstack/react-query';

export function useChatSocket(id) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!id) return;

        const channelName = `chat.${id}`;
        const channel = echo.private(channelName);

        channel.listen('.message.sent', (e) => {
            console.log(`Event registered!: New message posted in chat ${id}`);
            queryClient.setQueryData(["chat_messages", id], (oldData) => {
                if (!oldData) 
                    return oldData;

                //ONLY FOR STRICT MODE, AS IT DUPLICATES THE ENTRIES
                const isDuplicate = oldData.pages.some(page => 
                    page.data.some(msg => msg.id === e.messageData.id)
                );
                if (isDuplicate) 
                    return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page, index) => {
                        if (index === 0)
                            return {
                                ...page,
                                data: [e.messageData, ...page.data]
                            };

                        return page;
                    })
                };
            });
        });

        return () => {
            channel.stopListening('.message.sent');
            echo.leave(channelName);
        };
    }, [id, queryClient]);
}