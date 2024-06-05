import { useEffect } from "react"
import { useGetProfileQuery } from "../../store/authQueryApi/authQueryApi"
import { LocalStorageService } from "../localStorage/localStorage"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../../store/slices/authSlice"






function checkAuth() {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const { get, clear } = LocalStorageService()
    const { data, error } = useGetProfileQuery()
    console.log(data)
    console.log(error)
    const auth = () => {
        const token = get('token')
        if (token && !error) {         
                dispatch(login(data))
                return
        }
        dispatch(logout())
        clear('token')

    }

    useEffect(() => {
        auth()
    }, [data])

    return {
        isAuth
    }


}


export default checkAuth