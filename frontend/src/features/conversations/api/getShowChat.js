import { API_URL } from "../../../constants/api";

export async function fetchShowChat(chat_id) {
  const res = await fetch(`${API_URL}/chats/${chat_id}`, {
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