import { useQuery } from "@tanstack/react-query";
import { fetchIndexChats } from "../api/getIndexChats";

export function useIndexChats() {
  return useQuery({
    queryKey: ["index_chats"],
    queryFn: () => fetchIndexChats(),
  });
}