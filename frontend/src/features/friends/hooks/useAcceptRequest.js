import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest } from "../api/acceptRequest.js";

export function useAcceptRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => acceptRequest(id),

    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["received_requests"]);
      queryClient.invalidateQueries(["sent_requests"]);
      queryClient.invalidateQueries(["users"]);
      console.log('Successfully accepted the request.');
    }
  });
}