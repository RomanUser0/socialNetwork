import { useEffect } from "react"
import { useGetProfileQuery } from "../../store/authQueryApi/authQueryApi"
import { LocalStorageService } from "../localStorage/localStorage"
import { useDispatch, useSelector } from "react-redux"
import {  login, logout } from "../../store/slices/authSlice"





function checkAuth() {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const { get, clear } = LocalStorageService()
    const { data, error } = useGetProfileQuery()

    const auth = () => {
        const token = get('token')
        if (!token) {
            dispatch(logout())
            clear('token')
            return
        }
        dispatch(login(data))
    }

    useEffect(() => {
        auth()
    }, [data])

    return {
        isAuth
    }


}


export default checkAuth