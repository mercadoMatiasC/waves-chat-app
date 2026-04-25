import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeRequest } from "../api/storeRequest";

export function useSendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (other_user_id) => storeRequest(other_user_id),
    
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sent_requests"]);
      queryClient.invalidateQueries(["users"]);
      console.log('Successfully sent request');
    }
  });
}