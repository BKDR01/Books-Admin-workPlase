import axios from "axios"

const API = axios.create({
    baseURl: "https://lib.qaxramonov.uz/api/v1"
})

export const loginUser = () => API.post("admin-auth/login", data)
export const addBook = (data) => API.post("admin/books/add", data)
export const addNews = (data) => API.post("news/add", data)