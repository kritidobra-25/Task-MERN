import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post'],
        }),
        getPost: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: ['Post'],
        }),
        getMyPosts: builder.query({
            query: () => '/posts/user/myposts',
            providesTags: ['Post'],
        }),
        createPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useGetMyPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApi;
