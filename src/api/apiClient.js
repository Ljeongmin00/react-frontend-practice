const BASE_URL = "http://localhost:8080";

async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message || "API 요청 실패");
    }

    return result;
}

export async function getPosts() {
  return request("/posts?page=0&size=10");
}

export async function signup(data) {
    return request("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}