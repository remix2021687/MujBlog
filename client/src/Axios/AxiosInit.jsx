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
}, async (ErrorResponse) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('token_ref')
  const pathURL = location.pathname.replace(/^\/+|\/+$/g, "")


  if (token || refreshToken) {
    if (ErrorResponse.response?.status == 401) {
      const responseConfig = ErrorResponse.config;
      
      await AxiosInit.post('auth/login/refresh/', 
        {refresh: refreshToken}
      )
      
      .then((res) => {
        console.log(res.data.access)
        localStorage.setItem('token', res.data.access)
        responseConfig.headers.Authorization = `Bearer ${res.data.access}`
      })

      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('token_ref')
        location.href = '/404'
      })
    } else {
      location.href = '/admin'
    }
  } 
  else if (ErrorResponse.response?.status == 401 && pathURL == 'admin/login') {
      
    return ErrorResponse
  } else {
    location.href = '/404'
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

//Admin Redux
export const GetProfile = async () => await AxiosInit.get('admin/profile/')

export const CreatePostAdmin = async (data) => await AxiosInit.post('admin/create/', data, 
    {headers: {"Content-Type": "multipart/form-data"}}
)

export const EditPostAdmin = async (id, data) => await AxiosInit.put(`admin/edit/${id}/`, data, 
    {headers: {"Content-Type": 'multipart/form-data'}}
)

export const DeletePostAdmin = async (id) => await AxiosInit.delete(`admin/edit/${id}`)

export const GetPost = async () => await AxiosInit.get('posts/')

export const GetPostSelf = async (id) => await AxiosInit.get(`posts/${id}/`)

export const GetPostPin = async () => await AxiosInit.get('pins/')

export const GetPostPinSelf = async (id) => await AxiosInit.get(`pins/${id}/`)

export const GetGallery = async () => await AxiosInit.get('gallery/')