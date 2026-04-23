import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => login(data),
    
    onError: (error) => {
      console.error(error.message || error);
    },
    onSuccess: () => {
      queryClient.clear(); 
      console.log('Successfully logged in');
      navigate('/');
    }
  });
}