import { API_URL } from "../../../constants/api";

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/me`, {
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