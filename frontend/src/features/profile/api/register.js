import { API_URL } from "../../../constants/api"

export async function register(data) {
  await fetch(`${API_URL.replace('/api', '')}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 204) //NO JSON PARSING IF THERE WERE NO ERRORS
    return null;

  const json = await res.json().catch(() => null);

  if (!res.ok)
    throw json; 

  return json;
}