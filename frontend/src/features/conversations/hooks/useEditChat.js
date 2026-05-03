import { useQuery } from "@tanstack/react-query";
import { fetchEditChat } from "../api/getEditChat";

export function useEditChat(chat_id) {
    return useQuery({
        queryKey: ['chat', chat_id], //ADD ID TO THE KEY SO IT'S A UNIQUE QUERY
        queryFn: () => fetchEditChat(chat_id),
        enabled: !!chat_id,
    });
}