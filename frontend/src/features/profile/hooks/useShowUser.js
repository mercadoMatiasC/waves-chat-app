import { useQuery } from "@tanstack/react-query";
import { fetchShowUser } from "../api/getShowUser";

export function useShowUser(user_id) {
    return useQuery({
        queryKey: ['user', user_id], //ADD ID TO THE KEY SO IT'S A UNIQUE QUERY
        queryFn: () => fetchShowUser(user_id),
        enabled: !!user_id,
    });
}