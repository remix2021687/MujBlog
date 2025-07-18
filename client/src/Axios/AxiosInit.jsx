import axios from "axios";

export const AxiosInit = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api/`,
    timeout: 5000,
})

AxiosInit.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

AxiosInit.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('token_ref');

        try {
            const response = await AxiosInit.post('auth/login/refresh/', { refresh: refreshToken });
            localStorage.setItem('token', response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return AxiosInit(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem('token');
            localStorage.removeItem('token_ref');
            location.href = '/404';
        }
    }
})


export const axiosBaseQuery = ({ baseURL } = {baseURL: ''}) => 
  async ({ url, method, data, headers, params }) => {
    try {
      const result = await AxiosInit({
        url: baseURL + url,
        method,
        data,
        params,
        headers
      });

      return {data: result.data}
    } catch(AxiosErrors) {
      const error = AxiosErrors.response?.data || AxiosErrors.message;

      return { error }
    }
};

export const AuthLogin = async (data) => await AxiosInit.post('auth/login/', data)

export const GetPost = async () => await AxiosInit.get('posts/')

export const GetPostSelf = async (id) => await AxiosInit.get(`posts/${id}/`)

export const GetPostPin = async () => await AxiosInit.get('pins/')

export const GetPostPinSelf = async (id) => await AxiosInit.get(`pins/${id}/`)

export const GetGallery = async () => await AxiosInit.get('gallery/')