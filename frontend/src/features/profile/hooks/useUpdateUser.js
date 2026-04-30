import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/updateUser.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["user", id]);
      const previous_user = queryClient.getQueryData(["user", id]);

      const updatedFields = Object.fromEntries(data.entries());

      queryClient.setQueryData(["user", id], old => ({
        ...old,
        ...updatedFields
      }));

      queryClient.setQueryData(["me"], old => {
        if (!old?.data) return old;
        return {
          ...old,
          data: { ...old.data, ...updatedFields }
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
      queryClient.invalidateQueries(["me"]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}