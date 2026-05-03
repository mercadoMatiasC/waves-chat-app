import { apiRequest } from "../../../utils/apiClient";

export async function deleteGroup(id) {
    return apiRequest(`/chats/${id}`, { method: "DELETE" });
}