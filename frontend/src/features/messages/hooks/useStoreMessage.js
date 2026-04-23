import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeMessage } from "../api/storeMessage";

export function useStoreMessage(chat_id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }) => storeMessage(chat_id, data),

    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ["messages", chat_id] });
      const previousMessages = queryClient.getQueryData(["messages", chat_id]);

      queryClient.setQueryData(["messages", chat_id], (old) => {
        const optimisticMsg = {
          ...data,
          id: Date.now(), // Temporary ID
          created_at: new Date().toISOString(),
          isOptimistic: true,
        };
        
        return {
          ...old,
          data: [optimisticMsg, ...(old?.data || [])],
        };
      });

      return { previousMessages };
    },

    onError: (err, newMsg, context) => {
      queryClient.setQueryData(["messages", chat_id], context.previousMessages);
      console.error("Mutation failed, rolled back:", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chat_id] });
    },
  });
}