import axios from "axios"

const base = import.meta.env.VITE_BACKEND_API

const api = axios.create({
    baseURL: base,
    withCredentials: true
})

export default api