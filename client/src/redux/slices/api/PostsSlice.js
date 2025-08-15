import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../Axios/AxiosInit";

export const PostsSliceAPI = createApi({
	reducerPath: "api/posts",
	baseQuery: axiosBaseQuery({
		baseURL: `${import.meta.env.VITE_URL}/api/`,
	}),
	refetchOnMountOrArgChange: true,

	endpoints: (builder) => ({
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

		GetPostPin: builder.query({
			query: () => ({
				url: "pins/",
				method: "GET",
			}),
		}),

		GetPostPinSelf: builder.query({
			query: (id) => ({
				url: `pins/${id}/`,
				method: "GET",
			}),
		}),

		GetGallery: builder.query({
			query: () => ({
				url: "gallery/",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostSelfQuery,
	useGetPostPinQuery,
	useGetPostPinSelfQuery,
	useGetGalleryQuery,
} = PostsSliceAPI;
