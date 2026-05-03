import { API_URL } from "../../../constants/api"

export async function storeGroup(data) {
  const res = await fetch(`${API_URL}/chats`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (res.status === 204) //NO JSON PARSING IF THERE WERE NO ERRORS
    return null;

  const json = await res.json().catch(() => null);

  if (!res.ok)
    throw json; 

  return json;
}