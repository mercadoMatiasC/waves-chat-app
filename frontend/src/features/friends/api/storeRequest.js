import { apiRequest } from "../../../utils/apiClient";

export async function storeRequest(other_user_id) {
    return apiRequest(`/friend-requests/${other_user_id}`, { 
        method: "POST",
    });
}