import axios from "axios";

export const AxiosInit = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api/`
})

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