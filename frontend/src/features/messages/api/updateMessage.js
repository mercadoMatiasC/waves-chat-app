import { apiRequest } from "../../../utils/apiClient";

export async function updateMessage(id, data) {
    return apiRequest(`/messages/${id}`, { 
        method: "PATCH", 
        body: data
    });
}