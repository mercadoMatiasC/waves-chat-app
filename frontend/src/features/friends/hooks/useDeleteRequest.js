import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "../api/deleteRequest";

export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (other_user_id) => deleteRequest(other_user_id),
    
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["received_requests"]);
      queryClient.invalidateQueries(["sent_requests"]);
      queryClient.invalidateQueries(["users"]);
      console.log('Successfully deleted request');
    }
  });
}