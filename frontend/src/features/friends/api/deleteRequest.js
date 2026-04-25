import { API_URL } from "../../../constants/api";

export async function deleteRequest(other_user_id) {
  console.log(`${API_URL}/friend/${other_user_id}`);
  const res = await fetch(`${API_URL}/friends/${other_user_id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok)
    throw json;

  return json;
}