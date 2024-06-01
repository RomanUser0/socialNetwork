import { useDispatch } from "react-redux"
import { LocalStorageService } from "../localStorage/localStorage"
import { useLoginMutation } from '../../store/authQueryApi/authQueryApi'
import { login } from "../../store/slices/authSlice"





export function loginUserService() {


    const [loginUserQuery, { isError, isLoading }] = useLoginMutation()
    const { set } = LocalStorageService()
    const dispatch = useDispatch()

    const loginUser = async (body) => {
        const user = await loginUserQuery(body)
        dispatch(login(user.data))
        set('token', user.data.token)

    }

    return {
        loginUser
    }

}