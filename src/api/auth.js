import axios from "axios";

const API = axios.create({
    baseURL: "https://lib.qaxramonov.uz/api/v1"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = (data) => API.post("/admin-auth/login", data);
export const addBook = (data) => API.post("/admin/books/add", data);
export const addNews = (data) => API.post("/news/add", data);
export const deleteNews = (id) => API.delete(`/news/${id}`);