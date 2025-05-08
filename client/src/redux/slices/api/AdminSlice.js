import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AxiosInit } from '../../../Axios/AxiosInit'

//Rework 
// const axiosBaseQuery =
//   ({ perparHeader } = {}) =>
//   async ({ url, method, data, params, headers, body }) => {
//     try {
//       const result = await AxiosInit({
//         url,
//         method,
//         data,
//         params,
//         headers: perparHeader?.() || {},
//         body,
//       });
//       return Promise.resolve(result)
//     } catch (axiosError) {
//       return Promise.reject(axiosError?.response?.data);
//     }
//   };

// export const api = createApi({
//     reducerPath: 'api',
//     baseQuery: axiosBaseQuery(),
//     tagTypes: ['Admin_Post'],

//     endpoints: (builder) => {
//         getPosts: builder.query({
//             query: () => ({
//                 url: 'admin/posts/',
//                 method: 'get',
//             }),
//             providesTags: ['Admin_Post']
//         })
//     }
// })