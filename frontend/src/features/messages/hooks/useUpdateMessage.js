import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMessage } from "../api/updateMessage.js";

export function useUpdateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMessage(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["message", id]);
      const previous_message = queryClient.getQueryData(["message", id]);

      queryClient.setQueryData(["message", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["message"], old => { //UPDATE LIST
        if (!old?.data) 
            return old;

        return {
          ...old,
          data: old.data.map(g =>
            g.id === id ? { 
              ...g, 
              ...data } 
            : g
          )
        };
      });

      return { previous_message };
    },

    onError: (err, variables, context) => { //RETURN OLD VALUES
      const { id } = variables;
      queryClient.setQueryData(["wave", id], context.previous_message);
    },
    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["chats"]); //STALING CHATS LIST QUERY
      queryClient.invalidateQueries(["messages"]);
      queryClient.invalidateQueries(["message", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}