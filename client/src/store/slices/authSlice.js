import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
    },
    lengthFriends: [],
    isAuth: false
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        },
        login: (state, action) => {
            state.user = action.payload
            state.isAuth = true
            state.lengthFriends = action.payload?.lengthFriends
        },
        logout: (state) => {
            state.user = {}
            state.isAuth = false
        }
    }

})

export const { createUser, login, logout } = authSlice.actions
export default authSlice.reducer