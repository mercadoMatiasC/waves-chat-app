import { apiRequest } from "../../../utils/apiClient";

export async function storeGroup(dataToSend) {
    return apiRequest("/chats", { 
        method: "POST", 
        body: dataToSend 
    });
}