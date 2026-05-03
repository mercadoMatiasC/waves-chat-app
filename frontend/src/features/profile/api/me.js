import { apiRequest } from "../../../utils/apiClient";

export async function fetchMe() {
    return apiRequest(`/me`, { method: "GET" });
}