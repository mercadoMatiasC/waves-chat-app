import { apiRequest } from "../../../utils/apiClient";
import { API_URL } from "../../../constants/api";

export async function login(data) {
    await fetch(`${API_URL.replace('/api', '')}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    return apiRequest("/login", { 
        method: "POST", 
        body: data,
    });
}