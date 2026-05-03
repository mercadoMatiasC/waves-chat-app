import { apiRequest } from "../../../utils/apiClient";

export async function updateGroup(id, dataToSend) {
    return apiRequest(`/chats/${id}`, { 
        method: "PATCH", 
        body: dataToSend 
    });
}