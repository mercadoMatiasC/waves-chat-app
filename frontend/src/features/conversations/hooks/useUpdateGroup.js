import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "../api/updateGroup.js";

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateGroup(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["chat", id]);
      const previous_group = queryClient.getQueryData(["chat", id]);

      queryClient.setQueryData(["chat", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["chat"], old => { //UPDATE LIST
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

      return { previous_group };
    },

    onError: (err, variables, context) => { //RETURN OLD VALUES
      const { id } = variables;
      queryClient.setQueryData(["chat", id], context.previous_group);
    },
    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["users"]); //STALING USERS LIST QUERY
      queryClient.invalidateQueries(["chats"]);
      queryClient.invalidateQueries(["chat", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}