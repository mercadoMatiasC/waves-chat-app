import { useQuery } from "@tanstack/react-query";
import { fetchReceivedRequests } from "../api/getReceivedRequests";

export function useReceivedRequests() {
  return useQuery({
    queryKey: ["received_requests"],
    queryFn: () => fetchReceivedRequests(),
  });
}