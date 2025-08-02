import axios from "axios";

const base = import.meta.env.VITE_BACKEND_API;
const MAX_RETRIES = 2;

const api = axios.create({
    baseURL: base,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (originalRequest.url.includes("/user/refresh")) {
            return Promise.reject(error);
        }
        // Initialize retry count if not present
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (error.response?.status === 401 && originalRequest._retryCount < MAX_RETRIES) {
            originalRequest._retryCount += 1;

            try {
                await api.post('/user/refresh');
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
