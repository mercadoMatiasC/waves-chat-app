import { apiRequest } from "../../../utils/apiClient";

export async function fetchIndexUsers(endpoint) {
    return apiRequest(endpoint, { method: "GET" });
}