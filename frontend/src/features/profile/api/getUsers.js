import { apiRequest } from "../../../utils/apiClient";

export async function fetchUsers() {
    return apiRequest(`/users`, { method: "GET" });
}