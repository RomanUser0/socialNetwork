import { useAddFriendMutation, useSearchFriendsQuery } from '../../store/friendsQueryApi/friendsQueryApi'
import Styles from './searchFriends.module.css'
import { UserPlus } from 'lucide-react'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'
import { SubmitFile } from '../../hooks/submitFile'



function SearchFriends() {

    const { data = [] } = useSearchFriendsQuery()
    const [addFriend] = useAddFriendMutation()
    const submit = async (id) => {
        await addFriend({id: id})
    }


    return (
        <div className={Styles.searchFriends}>
            {data?.map((user) => <div className={Styles.user} key={user.id}>
                <div className={Styles.wrapper}>
                    <img src={user.isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault}/>
                <div className={Styles.nameUser}>
                    <h3>{user.firstname} {user.lastname}</h3>
                </div>
                </div>  
                <button onClick={() => submit(user.id)} className={Styles.addUser}><UserPlus className={Styles.lucideAddUser} /></button>
            </div>)

            }

        </div>
    )
}

export default SearchFriends