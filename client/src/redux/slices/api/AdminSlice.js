import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../Axios/AxiosInit'

export const apiSlice = createApi({
    reducerPath: 'api/admin',
    baseQuery: axiosBaseQuery({
        baseURL: `${import.meta.env.VITE_URL}/api/`
    }),
    refetchOnMountOrArgChange: true,
    
    endpoints: builder => ({
        
        GetAdminList: builder.query({
            query: () => ({
                url: 'admin/list/',
                method: 'GET'
            }),
        }),

        GetPosts: builder.query({
            query: () => ({
                url: 'admin/posts/',
                method: 'GET'
            }),
        }),

        GetPostByID: builder.query({
            query: (id) => ({
                url: `admin/posts/${id}`,
                method: 'GET',
            })
        }),

        CreatePostAdmin: builder.mutation({
            query: (body) => ({
                url: 'admin/create/',
                method: 'POST',
                headers: {"Content-Type": 'multipart/form-data'},
                data: body
            }),
        })
    })
})

export const { 
    useGetPostsQuery, 
    useGetPostByIDQuery, 
    useGetAdminListQuery,
    useCreatePostAdminMutation
} = apiSlice;