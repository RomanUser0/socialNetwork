import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_URL}/api`
    }),
    endpoints: () => ({})
})

export const authApi = baseApi.injectEndpoints({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api` }),
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (body) => ({
                url: 'createUser',
                method: 'POST',
                body
            })
        }),
        login: build.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            })
        }),
        getProfile: build.query({
            query: () => ({
                url: 'auth/profile',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token') 
                }
            })
        }),
        getUser: build.mutation({
            query: (body) => ({
                 url: 'getUser',
                 method: 'POST',
                 body
            })
        })
    })
})

export const { useCreateUserMutation, useGetProfileQuery, useLoginMutation, useGetUserMutation } = authApi