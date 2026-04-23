import { API_URL } from "../../../constants/api";

export async function storeMessage(chat_id, data) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined)
      formData.append(key, data[key]);
  });

  const res = await fetch(`${API_URL}/chats/${chat_id}/messages`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok)
    throw json;

  return json;
}