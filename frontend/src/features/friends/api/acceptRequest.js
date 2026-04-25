import { API_URL } from "../../../constants/api";

export async function acceptRequest(other_user_id) {
  const res = await fetch(`${API_URL}/friend-requests/${other_user_id}`, {
    method: "PATCH",
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