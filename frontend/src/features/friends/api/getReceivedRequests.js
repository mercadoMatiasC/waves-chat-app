import { apiRequest } from "../../../utils/apiClient";

export async function fetchReceivedRequests() {
    return apiRequest(`/friend-requests/received`, { method: "GET" });
}