import { API_URL } from "../../../constants/api";

export async function fetchMe() {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  if (!res.ok)
    throw new Error("Unauthorized");

  const data = await res.json();
  return data; 
}