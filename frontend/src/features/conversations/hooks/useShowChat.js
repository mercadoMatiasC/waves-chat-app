import { useQuery } from "@tanstack/react-query";
import { fetchShowChat } from "../api/getShowChat";

export function useShowChat(chat_id) {
  return useQuery({
    queryKey: ["show_chat"],
    queryFn: () => fetchShowChat(chat_id),
  });
}