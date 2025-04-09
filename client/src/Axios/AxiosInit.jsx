import axios from "axios";

export const AxiosInit = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api/`
})

AxiosInit.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

AxiosInit.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const { data } = await AxiosInit.post('auth/login/refresh/',
            {refresh: localStorage.getItem('token_ref')}
          );
          
          localStorage.setItem('token', data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return AxiosInit(originalRequest);
          
        } catch (refreshError) {
          localStorage.removeItem('token');
          localStorage.removeItem('token_ref');
          window.location.href = '/admin/login/'
          return Promise.reject(refreshError)
        }
      }
      
      return Promise.reject(error);
    }
  );
  

export const AuthLogin = async (data) => await AxiosInit.post('auth/login/', data)

export const GetProfile = async () => await AxiosInit.get('admin/profile/')

export const GetPostAdmin = async (id) => {
  
  try {
    if (id) {
     return await AxiosInit.get(`admin/posts/${id}`)
    } else {
      return await AxiosInit.get('admin/posts/')
    }
  } catch(err) {
    
  }
}

export const CreatePostAdmin = async (data) => await AxiosInit.post('admin/create/', data, 
    {headers: {"Content-Type": "multipart/form-data"}}
)

export const EditPostAdmin = async (id, data) => await AxiosInit.put(`admin/edit/${id}/`, data, 
    {headers: {"Content-Type": 'multipart/form-data'}}
)

export const DeletePostAdmin = async (id) => await AxiosInit.delete(`admin/edit/${id}`)

export const GetPost = async () => await AxiosInit.get('posts/')

export const GetPostPin = async () => await AxiosInit.get('pins/')

export const GetPostSelf = async (id) => await AxiosInit.get(`posts/${id}/`)

export const GetGallery = async () => await AxiosInit.get('gallery/')