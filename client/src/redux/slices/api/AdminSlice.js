import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../Axios/AxiosInit'

export const apiSlice = createApi({
    reducerPath: 'api/admin',
    baseQuery: axiosBaseQuery({
        baseURL: `${import.meta.env.VITE_URL}/api/`
    }),
    
    endpoints: builder => ({
        
        GetAdminList: builder.query({
            query: () => ({
                url: 'admin/list/',
                method: 'get'
            })
        }),

        GetPosts: builder.query({
            query: () => ({
                url: 'admin/posts/',
                method: 'get'
            })
        }),

        GetPostByID: builder.query({
            query: (id) => ({
                url: `admin/posts/${id}`,
                method: 'get',
            })
        })
    })
})

export const { useGetPostsQuery, useGetPostByIDQuery, useGetAdminListQuery } = apiSlice;