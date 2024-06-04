import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../authQueryApi/authQueryApi";



export const messageApi = baseApi.injectEndpoints({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api` }),
    endpoints: (build) => ({
        getMessage: build.mutation({
            query: (body) => ({
                url: 'getMessage',
                method: 'POST',
                body,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        }),
        getChats: build.query({
            query: () => ({
                url: 'getChats',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        })
    })
})


export const { useGetMessageMutation, useGetChatsQuery } = messageApi