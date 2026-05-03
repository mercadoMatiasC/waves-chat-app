import { apiRequest } from "../../../utils/apiClient";

export async function deleteRequest(other_user_id) {
    return apiRequest(`/friends/${other_user_id}`, { method: "DELETE" });
}