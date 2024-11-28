import Axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios'

// Types pour la configuration
interface ApiConfig {
    baseURL: string;
    timeout?: number;
    headers: Record<string, string>;
}

// Configuration de base
const config: ApiConfig = {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

const axios: AxiosInstance = Axios.create({
    ...config,
    withCredentials: true,
    withXSRFToken: true,
});

// Intercepteurs
axios.interceptors.request.use(
    (config) => {
        config.headers['X-Client-Type'] = 'web';
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
        }
        return Promise.reject(error);
    }
);

export { isAxiosError }
export default axios