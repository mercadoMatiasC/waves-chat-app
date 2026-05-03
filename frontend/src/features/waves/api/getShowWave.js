import { apiRequest } from "../../../utils/apiClient";

export async function fetchShowWave(user_id) {
    return apiRequest(`/users/${user_id}/wave`, { method: "GET" });
}