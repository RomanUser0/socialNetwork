import { useDispatch } from "react-redux"
import { LocalStorageService } from "../localStorage/localStorage"
import { useLoginMutation } from '../../store/authQueryApi/authQueryApi'
import { login, logout } from "../../store/slices/authSlice"





export function loginUserService() {


    const [loginUserQuery, { isError, isLoading }] = useLoginMutation()
    const { set } = LocalStorageService()
    const dispatch = useDispatch()

    const loginUser = async (body) => {
        const user = await loginUserQuery(body) 
         if(!!user.error) {
            dispatch(logout())
            return
         }
        dispatch(login(user.data))
        set('token', user.data.token)

    }

    return {
        loginUser,
        isError
    }

}