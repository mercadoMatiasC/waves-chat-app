// src/utils/apiClient.js
import { API_URL } from "../constants/api";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) 
        return decodeURIComponent(parts.pop().split(';').shift());
}

export async function apiRequest(endpoint, options = {}) {
    const { method = "GET", body, headers = {}, ...rest } = options;

    const defaultHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    };

    //MANAGES XSRF TOKEN INCLUSION
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())) {
        const token = getCookie("XSRF-TOKEN");
        if (token)
            defaultHeaders["X-XSRF-TOKEN"] = token;
    }

    const config = {
        method,
        headers: { ...defaultHeaders, ...headers },
        credentials: "include", //SANCTUM HEADERS
        ...rest,
    };

    if (body)
        if (body instanceof FormData) {
            config.body = body;
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
            config.body = JSON.stringify(body);
        }

    /*
    console.log("DEBUG MODE:", {
        url: `${API_URL}${endpoint}`,
        method: config.method,
        headers: config.headers,
        body: config.body
    });
    */

    const res = await fetch(`${API_URL}${endpoint}`, config);

    //HANDLE 204 (NO CONTENT)
    if (res.status === 204) 
        return null;

    const json = await res.json().catch(() => null);

    if (!res.ok) 
        throw json;

    return json;
}