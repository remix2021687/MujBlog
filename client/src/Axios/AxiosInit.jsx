import axios from "axios";

export const AxiosInit = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api/`
})

AxiosInit.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token}`

    return config
})

export const AuthLogin = async (data) => {
    const response = await AxiosInit.post('auth/login/', data)

    try {
        return response
    } catch(err) {
        return response
    }
}

export const refTokenAuth = async (token) => {
    const request = await AxiosInit.post('auth/login/refresh/', token)

    try {
        return request
    } catch(err) {
        return request
    }
}

export const GetPostAdmin = async () => {
    const response = await AxiosInit.get('admin/posts/')

    try {
        return response
    } catch (err) {
        return response
    }
}

export const GetPost = async () => {
    const response = await AxiosInit.get('posts/')

    try {
        return response
    } catch (err) {
        return response
    }
}


export const GetPostSelf = async (id) => {
    const response = await AxiosInit.get(`posts/${id}/`)

    try {
        return response
    } catch (err) {
        return response
    }
}

export const GetGallery = async () => {
    const response = await AxiosInit.get('gallery/')

    try {
        return response
    } catch (err) {
        return response
    }
}