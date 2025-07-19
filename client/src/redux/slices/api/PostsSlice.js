import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../Axios/AxiosInit";

export const PostsSliceAPI = createApi({
    reducerPath: "api/posts",
    baseQuery: axiosBaseQuery({
        baseURL: `${import.meta.env.VITE_URL}/api/`,
    }),
    refetchOnMountOrArgChange: true,

    endpoints: builder => ({

        GetPosts: builder.query({
            query: () => ({
                url: "posts/",
                method: "GET",
            }),
        }),

        GetPostSelf: builder.query({
            query: (id) => ({
                url: `posts/${id}/`,
                method: "GET",
            }),
        }),
    })
})

export const { 
    useGetPostsQuery,
    useGetPostSelfQuery
} = PostsSliceAPI;