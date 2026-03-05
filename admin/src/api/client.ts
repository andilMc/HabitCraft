import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token');

                const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
