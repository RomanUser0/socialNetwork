import { Link } from 'react-router-dom'
import Styles from './newMessage.module.css'
import { MessageCircle, SquareArrowLeft } from 'lucide-react'
import { useGetAllfriendsQuery } from '../../store/friendsQueryApi/friendsQueryApi'


function NewMessage() {



    const { data = [] } = useGetAllfriendsQuery()


    return (
        <div className={Styles.newMessage}>
            <div className={Styles.header}>
                <div className={Styles.description}>
                    <Link to={'/chats'}><SquareArrowLeft className={Styles.lucideHeader} /></Link>
                    <h2>Новое сообщение</h2>
                </div>
            </div>
            <div className={Styles.allFriends}>
                {data?.map((user) => <Link to={`/chats/messages/${user.id}`} key={user.id}>
                    <div className={Styles.friend}>
                        <div className={Styles.description}>
                            <img width={'40px'} src={`/api/getPhoto/${user.id}`}></img>
                            <p>{user.firstname} {user.lastname}</p>
                        </div>
                    </div>
                </Link>)}
            </div>
        </div>
    )
}

export default NewMessage