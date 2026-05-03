import { apiRequest } from "../../../utils/apiClient";

export async function logout() {
    return apiRequest("/logout", { 
        method: "POST", 
    });
}