import Styles from './friend.module.css'
import { useGetIsPhotoMutation } from '../../store/photoQueryApi/photoQueryApi'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar'



function Friend({ user }) {


    const [isPhotofn, { isSuccess }] = useGetIsPhotoMutation()
    const [isPhoto, setIsPhoto] = useState()
    console.log({isPhoto, id: 1})
    const getIsPhoto = async () => {
       const isPhoto = await isPhotofn({ id: user.id})
       setIsPhoto(isPhoto)
    }

    useEffect(() => {
        getIsPhoto()
    },[])

    return (
        <div className={Styles.friend} key={user.id}>
            <div className={Styles.description}>
                <img width={'40px'} src={isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault}></img>
                <p>{user.firstname} {user.lastname}</p>
            </div>
            <div>
                <Link to={`/chats/messages/${user.id}`}><MessageCircle className={Styles.message} /></Link>
            </div>
        </div>
    )
}


export default Friend