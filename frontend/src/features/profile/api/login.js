import { API_URL } from "../../../constants/api"

export async function login(data) {
  await fetch(`${API_URL.replace('/api', '')}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const isNoContent = res.status === 204;
  const json = isNoContent ? {} : await res.json(); 

  if (!res.ok) 
    throw json;
  
  return json;
}