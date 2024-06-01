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
            })
        }),
        addFriend: build.mutation({
            query: (body) => ({
                url: 'addFriend',
                method: 'POST',
                body,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        }),
        getFriend: build.query({
            query: (id) => ({
                url:`getFriend/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        }),
        searchFriends: build.query({
            query: () => ({
                url: 'searchFriends',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        })
    })
})


export const { useGetAllfriendsQuery, useAddFriendMutation, useGetFriendQuery, useSearchFriendsQuery } = friendsApi