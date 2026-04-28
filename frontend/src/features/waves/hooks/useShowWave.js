import { useQuery } from "@tanstack/react-query";
import { fetchShowWave } from "../api/getShowWave";

export function useShowWave(user_id) {
    return useQuery({
        queryKey: ['wave', user_id], //ADD ID TO THE KEY SO IT'S A UNIQUE QUERY
        queryFn: () => fetchShowWave(user_id),
        enabled: !!user_id,
    });
}