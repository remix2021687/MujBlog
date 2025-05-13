import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../Axios/AxiosInit'

export const apiSlice = createApi({
    reducerPath: 'api/admin',
    baseQuery: axiosBaseQuery({
        baseURL: `${import.meta.env.VITE_URL}/api/`
    }),
    tagTypes: ["admin_panel"],
    refetchOnMountOrArgChange: true,
    
    endpoints: builder => ({
        
        GetAdminList: builder.query({
            query: () => ({
                url: 'admin/list/',
                method: 'GET'
            }),
            providesTags: ['admin_panel']
        }),

        GetPosts: builder.query({
            query: () => ({
                url: 'admin/posts/',
                method: 'GET'
            }),
            providesTags: ['admin_panel']
        }),

        GetPostByID: builder.query({
            query: (id) => ({
                url: `admin/posts/${id}`,
                method: 'GET',
            })
        })
    })
})

export const { useGetPostsQuery, useGetPostByIDQuery, useGetAdminListQuery } = apiSlice;