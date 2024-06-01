import { useDispatch } from "react-redux"
import { LocalStorageService } from "../localStorage/localStorage"
import { createUser } from '../../store/slices/authSlice'
import { useCreateUserMutation } from "../../store/authQueryApi/authQueryApi"





export function createUserService() {

    const { set } = LocalStorageService()
    const [createUserQuery, { isError, isLoading }] = useCreateUserMutation()
    const dispatch = useDispatch()

    const createUserfn = async (body) => {
        const user = await createUserQuery(body)
        dispatch(createUser(user.data))
        set('token', user.data.token)
    }



    return {
        createUserfn
    }
}