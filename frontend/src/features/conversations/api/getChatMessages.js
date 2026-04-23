import { API_URL } from "../../../constants/api";

export async function fetchChatMessages(chat_id, pageParam = 1) {
  const res = await fetch(`${API_URL}/chats/${chat_id}/messages?page=${pageParam}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  if (!res.ok) 
    throw new Error("Unauthorized");

  return await res.json(); 
}