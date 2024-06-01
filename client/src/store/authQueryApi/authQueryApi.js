import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const authApi = createApi({
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
        })
    })
})

export const { useCreateUserMutation, useGetProfileQuery, useLoginMutation } = authApi