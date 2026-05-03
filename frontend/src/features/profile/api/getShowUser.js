import { apiRequest } from "../../../utils/apiClient";

export async function fetchShowUser(user_id) {
    return apiRequest(`/users/${user_id}`, { method: "GET" });
}