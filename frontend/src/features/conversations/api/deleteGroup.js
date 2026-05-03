import { API_URL } from "../../../constants/api"

export async function deleteGroup(id) {
    const res = await fetch(`${API_URL}/chats/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" },
        credentials: "include",
    });

  if (res.status === 204) //NO JSON PARSING IF THERE WERE NO ERRORS
    return null;

  const json = await res.json().catch(() => null);

  if (!res.ok)
    throw json; 

  return json;
}