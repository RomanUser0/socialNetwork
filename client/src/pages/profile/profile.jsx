import Styles from './profile.module.css'
import { useGetPhotosQuery } from '../../store/photoQueryApi/photoQueryApi'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'
import { useRef, useState } from 'react'
import { ChevronRight, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SubmitFile } from '../../hooks/submitFile'








function Profile() {


    const refPhoto = useRef()
    const refPhotos = useRef()
    const { submitFile, uploadFile, isPhoto, user, lengthFriends } = SubmitFile()
    const { data, isSuccess} = useGetPhotosQuery()
    const [avatar, setAvatar] = useState(false)
    const handleChangePhoto = async (event) => {
        submitFile(event, refPhoto, false)
    }
    const handleChangePhotos = (event) => {
        submitFile(event, refPhotos, true)
    }








    return (
        <div className={Styles.profile}>
            <div className={Styles.photo}>
                <img onClick={() => setAvatar((avatar) => !avatar)} src={isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault} className={Styles.avatar} />
                <div className={avatar ? Styles.redactorPhoto : Styles.isActive}>
                    <input ref={refPhoto} className={Styles.uploadPhoto} onChange={handleChangePhoto} type='file' />
                    <button onClick={() => uploadFile('one', refPhoto)}><Pencil className={Styles.lucidePhoto} /> Изменить фото</button>
                    <button><Trash2 className={Styles.lucidePhoto} /> Удалить фото</button>
                </div>
                <div className={Styles.name}>
                    <h2>{user?.firstname} {user?.lastname}</h2>
                </div>
            </div>
            <div className={Styles.friends}>
                <Link to={'/friends'}>
                    <p>{lengthFriends?.length} {!lengthFriends?.length || lengthFriends?.length >= 5 || lengthFriends?.length == 0 ? 'Друзей' : 'Друга'}</p>
                    <div className={Styles.friendPhoto}>
                        {lengthFriends?.length > 1 ?
                            <div>
                                <img src={`${import.meta.env.VITE_URL}/api/getPhoto/${lengthFriends ? lengthFriends[0] : ''}`} />
                                <img src={`${import.meta.env.VITE_URL}/getPhoto/${lengthFriends ? lengthFriends[1] : ''}`} />
                                <img src={`${import.meta.env.VITE_URL}/api/getPhoto/${lengthFriends ? lengthFriends[2] : ''}`} />
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </Link>
            </div>

            <div className={Styles.media}>
               
                    {isSuccess ?
                     <div className={Styles.photos}>
                        {
                       data?.slice(0, 6).map((item) => <img key={item.id} src={`${import.meta.env.VITE_URL}/api/getPhotos/${item.id}`} />)
                         }
                         </div>
                      
                    : 
                    <div className={Styles.isLoading}>
                            <img src={AvatarDefault} />
                            <img src={AvatarDefault} />
                            <img src={AvatarDefault} />
                            <img src={AvatarDefault} />
                            <img src={AvatarDefault} />
                            <img src={AvatarDefault} />
                        </div>
                   
                    }
               
                <div className={Styles.navPhoto}>
                    <input onChange={handleChangePhotos} ref={refPhotos} type='file' multiple="mulpiple" />
                    <button onClick={() => uploadFile('more', refPhotos)}>+ Загрузить фото</button>
                    <Link to={'/myPhotos'}>Показать все <ChevronRight className={Styles.lucideNav} /></Link>
                </div>
            </div>
        </div>
    )
}

export default Profile