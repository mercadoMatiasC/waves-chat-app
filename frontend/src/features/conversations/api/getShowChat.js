import { apiRequest } from "../../../utils/apiClient";

export async function fetchShowChat(chat_id) {
    return apiRequest(`/chats/${chat_id}`, { method: "GET" });
}