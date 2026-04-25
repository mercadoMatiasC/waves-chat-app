import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/me";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
    retry: (failureCount, error) => { //DON'T RETRY IF I'M NOT LOGGED IN
        if (error?.status === 401) 
          return false;
        return failureCount < 1;
    },
    staleTime: 1000 * 60 * 5, //5 MINUTES OF STALE TIME
  });
}