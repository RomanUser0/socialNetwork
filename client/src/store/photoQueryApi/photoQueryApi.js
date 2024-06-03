import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const photoApi = createApi({
    reducerPath: 'photoApi',
    tagTypes: ['Photos'],
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api` }),
    endpoints: (build) => ({
        createPhoto: build.mutation({
            query: (body) => ({
                url: 'uploadPhoto',
                method: 'POST',
                body,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            invalidatesTags: [{ type: 'Photos', id: 'LIST' }]
        }),
        createPhotos: build.mutation({
            query: (body) => ({
                url: 'uploadPhotos',
                method: 'POST',
                body,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            invalidatesTags: [{ type: 'Photos', id: 'LIST' }]
        }),
        getPhotos: build.query({
            query: () => ({
                url: 'getAllPhotos',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Photos', id })),
                    { type: 'Photos', id: 'LIST' },
                ]
                :
                [{ type: 'Photos', id: 'LIST' }]
        }),
        getIsPhoto: build.mutation({
            query: (body) => ({
                url: 'getIsPhoto',
                method: 'POST',
                body,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        })
    })
})

export const { useCreatePhotoMutation, useCreatePhotosMutation, useGetPhotosQuery, useGetIsPhotoMutation } = photoApi

