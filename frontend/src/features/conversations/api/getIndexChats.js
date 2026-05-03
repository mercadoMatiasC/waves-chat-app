import { apiRequest } from "../../../utils/apiClient";

export async function fetchIndexChats() {
    return apiRequest("/chats", { method: "GET" });
}