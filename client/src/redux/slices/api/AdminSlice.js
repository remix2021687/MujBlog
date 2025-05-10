import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../Axios/AxiosInit'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({

    }),
    tagTypes: ['Admin_Post'],

    endpoints: (builder) => {
      getAdminPosts: builder.query({
        query: () => ({
          url: 'admin/posts/'
        })
      })
    }
})