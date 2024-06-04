import Styles from './friends.module.css'
import { useAddFriendMutation, useGetAllfriendsQuery } from '../../store/friendsQueryApi/friendsQueryApi'
import { Search, SquareArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Friend from '../../components/friend/friend'



function Friends() {

    const { data = [] } = useGetAllfriendsQuery()
    const [addFriendApi] = useAddFriendMutation()
    const addFriend = async (id) => {
        await addFriendApi({ id: id })
    }







    return (
        <div className={Styles.friends}>
            <div className={Styles.header}>
                <div className={Styles.wrapper}>
                     <Link to={'/'}><SquareArrowLeft className={Styles.lucideHeader} /></Link>
                <h2>Друзья</h2>
                </div>
                <Link to={'/searchFriends'}><Search className={Styles.lusiceSearch}/></Link>
            </div>
            <div className={Styles.sort}>
                <p>Мои друзья <span>{data?.length}</span></p>
            </div>
            {data?.map((user) => <Friend key={user.id} user={user} />)}
        </div>
    )
}



export default Friends