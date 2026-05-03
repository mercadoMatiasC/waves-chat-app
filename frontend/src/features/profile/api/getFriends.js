import { apiRequest } from "../../../utils/apiClient";

export async function fetchFriends() {
    return apiRequest(`/friends`, { method: "GET" });
}