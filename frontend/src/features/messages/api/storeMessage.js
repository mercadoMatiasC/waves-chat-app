import { apiRequest } from "../../../utils/apiClient";

export async function storeMessage(chat_id, data) {
    return apiRequest(`/chats/${chat_id}/messages`, {
        method: "POST",
        body: data, 
    });
}