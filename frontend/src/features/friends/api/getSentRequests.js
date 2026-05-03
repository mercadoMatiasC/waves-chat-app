import { apiRequest } from "../../../utils/apiClient";

export async function fetchSentRequests() {
    return apiRequest(`/friend-requests/sent`, { method: "GET" });
}