import { useQuery } from "@tanstack/react-query";
import { fetchShowChat } from "../api/getShowChat";

export function useShowChat(chat_id) {
    return useQuery({
        queryKey: ['chat', chat_id], //ADD ID TO THE KEY SO IT'S A UNIQUE QUERY
        queryFn: () => fetchShowChat(chat_id),
        enabled: !!chat_id,
    });
}