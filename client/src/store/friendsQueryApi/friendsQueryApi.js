import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api` }),
    endpoints: (build) => ({
        getAllfriends: build.query({
            query: () => ({
                url: 'getAllFriends',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            providesTags: (result) => result
            ? [
                ...result.map(({ id }) => ({ type: 'friends', id })),
                { type: 'friends', id: 'LIST' },
            ]
            :
            [{ type: 'friends', id: 'LIST' }]
        }),
        addFriend: build.mutation({
            query: (body) => ({
                url: 'addFriend',
                method: 'POST',
                body,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            invalidatesTags: [{ type: 'friends', id: 'LIST' }]
        }),
        getFriend: build.query({
            query: (id) => ({
                url:`getFriend/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            invalidatesTags: [{ type: 'friends', id: 'LIST' }]
        }),
        searchFriends: build.query({
            query: () => ({
                url: 'searchFriends',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            invalidatesTags: [{ type: 'friends', id: 'LIST' }]
        })
    })
})


export const { useGetAllfriendsQuery, useAddFriendMutation, useGetFriendQuery, useSearchFriendsQuery } = friendsApi