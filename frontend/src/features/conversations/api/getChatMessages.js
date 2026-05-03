import { apiRequest } from "../../../utils/apiClient";

export async function fetchChatMessages(chat_id, pageParam = 1) {
    return apiRequest(`/chats/${chat_id}/messages?page=${pageParam}`, { method: "GET" });
}