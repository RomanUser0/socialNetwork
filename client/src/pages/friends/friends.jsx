import Styles from './friends.module.css'
import { useAddFriendMutation, useGetAllfriendsQuery } from '../../store/friendsQueryApi/friendsQueryApi'
import { MessageCircle, Search, SquareArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'
import { SubmitFile } from '../../hooks/submitFile'
import Friend from '../../components/friend/friend'



function Friends() {

    const { data = [] } = useGetAllfriendsQuery()
    console.log(data)
    const [addFriendApi] = useAddFriendMutation()
    const addFriend = async (id) => {
        await addFriendApi({ id: id })
    }
    const { isPhoto } = SubmitFile()







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
            {data?.map((user) => <Friend user={user} />/* <div className={Styles.friend} key={user.id}>
                <div className={Styles.description}>
                    <img width={'40px'} src={isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault}></img>
                <p>{user.firstname} {user.lastname}</p>
                </div>
                <div>
                     <Link to={`/chats/messages/${user.id}`}><MessageCircle className={Styles.message}/></Link>
                </div>             
            </div> */)}
        </div>
    )
}



export default Friends