import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../api/register";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => register(data),
    
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.clear(); 
      console.log('Successfully registered');
      navigate('/');
    }
  });
}