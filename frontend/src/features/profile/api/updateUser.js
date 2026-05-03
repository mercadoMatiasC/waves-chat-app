import { apiRequest } from "../../../utils/apiClient";

export async function updateUser(id, data) {
    return apiRequest("/me", { 
        method: "POST", 
        body: data 
    });
}