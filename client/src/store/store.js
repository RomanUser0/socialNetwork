import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authQueryApi/authQueryApi'
import authSlice from './slices/authSlice'
import { photoApi } from './photoQueryApi/photoQueryApi'
import { friendsApi } from './friendsQueryApi/friendsQueryApi'
import { messageApi } from './messageQueryApi/messageQueryApi'


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, photoApi.middleware, friendsApi.middleware, messageApi.middleware)
})