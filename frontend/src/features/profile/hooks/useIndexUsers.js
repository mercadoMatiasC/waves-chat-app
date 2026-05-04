import { useQuery } from "@tanstack/react-query";
import { fetchIndexUsers } from "../api/getIndexUsers";

export function useIndexUsers(q = "") {
    return useQuery({
        queryKey: ['chats', q],
        queryFn: () => fetchIndexUsers(`/users?q=${q}`),
    });
}