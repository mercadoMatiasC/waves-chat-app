import { useQuery } from "@tanstack/react-query";
import { fetchFriends } from "../api/getFriends";

export function useFriends() {
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => fetchFriends(),
  });
}