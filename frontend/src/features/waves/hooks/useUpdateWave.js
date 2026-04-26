import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWave } from "../api/updateWave.js";

export function useUpdateWave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateWave(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["wave", id]);
      const previous_wave = queryClient.getQueryData(["wave", id]);

      queryClient.setQueryData(["wave", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["wave"], old => { //UPDATE LIST
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

      return { previous_wave };
    },

    onError: (err, variables, context) => { //RETURN OLD VALUES
      const { id } = variables;
      queryClient.setQueryData(["wave", id], context.previous_wave);
    },
    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["users"]); //STALING USERS LIST QUERY
      queryClient.invalidateQueries(["waves"]);
      queryClient.invalidateQueries(["wave", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}