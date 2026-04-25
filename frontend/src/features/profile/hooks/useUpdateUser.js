import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/updateUser.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["user", id]);
      const previous_user = queryClient.getQueryData(["user", id]);

      queryClient.setQueryData(["user", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["user"], old => { //UPDATE LIST
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

      return { previous_user };
    },

    onError: (err, variables, context) => { //RETURN OLD VALUES
      const { id } = variables;
      queryClient.setQueryData(["user", id], context.previous_user);
    },
    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["users"]); //STALING USERS LIST QUERY
      queryClient.invalidateQueries(["user", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}