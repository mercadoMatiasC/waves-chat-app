import { API_URL } from "../../../constants/api";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": getCookie('XSRF-TOKEN'), 
    },
    credentials: "include",
  });

  if (!res.ok) throw await res.json();
  
  return true;
}