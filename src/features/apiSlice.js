import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const dataBaseApiSlice = createApi({
    reducerPath: "fileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: `/users`,
                params: { _page: page, _limit: limit }, // <- this is what json-server understands
            }),
            transformResponse: (response, meta) => {
                const totalCount = Number(meta.response.headers.get('X-Total-Count'));
                return {
                    users: response,
                    totalCount,
                };
            },
            providesTags: ["Users"],
        }),

        addUsers: builder.mutation({
            query: (users) => ({
                url: "/users",
                method: "POST",
                body: users
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUsers: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"]
        }),
        updateUsers: builder.mutation({
            query: ({ id, patch }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: patch
            }),
            invalidatesTags: ["Users"]
        }),
    })
})

export const {
    useAddUsersMutation,
    useGetUsersQuery,
    useDeleteUsersMutation,
    useUpdateUsersMutation,
} = dataBaseApiSlice;


