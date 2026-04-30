import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    
    onSuccess: () => {
      queryClient.clear(); 
      console.log('Successfully logged out');
      navigate('/Login', { replace: true }); 
    },
    
    onError: (error) => {
      console.error("Logout failed, but clearing local session anyway:", error);
      queryClient.clear(); 
      navigate('/Login', { replace: true });
    }
  });
}