import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchChatMessages } from "../api/getChatMessages";

export function useChatMessages(chat_id) {
  return useInfiniteQuery({
    queryKey: ["chat_messages", chat_id],
    queryFn: ({ pageParam = 1 }) => fetchChatMessages(chat_id, pageParam), 
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  });
}