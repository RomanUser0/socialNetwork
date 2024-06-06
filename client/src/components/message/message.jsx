import { useEffect, useState } from 'react'
import Styles from './message.module.css'
import { useGetUserMutation } from '../../store/authQueryApi/authQueryApi'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'



function Message({mess}){

    const [getUser] = useGetUserMutation()
    const [user, setUser] = useState()


    const getUserfn = async () => {
        const user = await getUser({ id: mess.sender })
        setUser(user.data)

    }

    useEffect(() => {
        getUserfn()
    },[])





    return(
        <div className={Styles.chat_item} key={mess.id}>
                    <img width={'45px'} height={'45px'} src={user?.isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${mess.sender}` : AvatarDefault} />
                    <div>
                        <div><p style={{color: 'grey'}}>{mess?.nameSender}</p></div>
                    <p key={mess.id}>{mess.message}</p>
                    </div> 
                    <p>{Math.trunc((Math.abs(new Date() - new Date(mess.created_at)) / 1000) / 60)} мин.назад</p>
                </div>
    )
}

export default Message