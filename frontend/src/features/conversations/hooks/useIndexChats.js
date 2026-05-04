import { useQuery } from "@tanstack/react-query";
import { fetchIndexChats } from "../api/getIndexChats";

export function useIndexChats(q = "") {
    return useQuery({
        queryKey: ['chats', q],
        queryFn: () => fetchIndexChats(`/chats?q=${q}`),
    });
}