import { apiRequest } from "../../../utils/apiClient";

export async function updateWave(id, data) {
    return apiRequest(`/my-wave`, { 
        method: "PATCH", 
        body: data,
    });
}