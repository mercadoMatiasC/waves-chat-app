import { apiRequest } from "../../../utils/apiClient";

export async function fetchEditChat(chat_id) {
    return apiRequest(`/chats/${chat_id}/Edit`, { method: "GET" });
}