import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteGroup } from "../api/deleteGroup";

export function useDeleteGroup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id }) => deleteGroup(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["chats"]);
            navigate("/");
        }
    });
}