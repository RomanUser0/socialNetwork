import { useAddFriendMutation, useSearchFriendsQuery } from '../../store/friendsQueryApi/friendsQueryApi'
import Styles from './searchFriends.module.css'
import { UserPlus } from 'lucide-react'



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
                    <img src={`/api/getPhoto/${user.id}`} />
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