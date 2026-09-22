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

export async function getPosts(page = 0, size = 10) {
  return request(`/posts?page=${page}&size=${size}`);
}

export async function getPost(postId) {
    return request(`/posts/${postId}`);
}

export async function createPost(data) {
    return request("/posts",{
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function signup(data) {
    return request("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function login(data) {
    return request("/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
}