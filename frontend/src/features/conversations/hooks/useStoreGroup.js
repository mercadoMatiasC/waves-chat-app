import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeGroup } from "../api/storeGroup";

export function useStoreGroup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => storeGroup(data),
    
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.clear(); 
      console.log('Successfully created group');
      navigate('/');
    }
  });
}