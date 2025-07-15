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
        }),

        EditPostAdmin: builder.mutation({
           query: (post) => ({
                url: `admin/edit/${post.id}/`,
                method: 'PUT',
                headers: {"Content-Type": 'multipart/form-data'},
                data: {
                    ...(post.photo && post.photo.length > 0 && {"photo": post.photo}),
                    "name": post.name,
                    "display_description": post.display_description,
                    "text": post.text,
                    "pin_post": post.pin_post
                }
            }),
        }),

        DeletePostAdmin: builder.mutation({
            query: (id, body) => ({
                url: `admin/edit/${id}/`,
                method: 'DELETE',
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
    useCreatePostAdminMutation,
    useEditPostAdminMutation
} = apiSlice;