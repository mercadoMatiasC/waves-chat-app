import { useQuery } from "@tanstack/react-query";
import { fetchSentRequests } from "../api/getSentRequests";

export function useSentRequests() {
  return useQuery({
    queryKey: ["sent_requests"],
    queryFn: () => fetchSentRequests(),
  });
}