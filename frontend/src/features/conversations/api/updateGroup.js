import { API_URL } from "../../../constants/api";

export async function updateGroup(id, data) {
  const res = await fetch(`${API_URL}/chats/${id}`, {
    method: "PATCH",
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