import { useSelector } from 'react-redux'
import Styles from './chats.module.css'
import { Link } from 'react-router-dom'
import { MessageSquareDiff } from 'lucide-react'
import { useGetChatsQuery } from '../../store/messageQueryApi/messageQueryApi'
import Chat from '../../components/chat/chat'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'






function Chats() {

    const user = useSelector(state => state.auth.user)
    const { data = [] } = useGetChatsQuery()









    return (
        <div className={Styles.chats}>
            <div className={Styles.navChats}>
                <div className={Styles.navChatsImg}>
                    <Link to={'/'}>{<img src={user?.isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault} />}</Link>
                    <p>Чаты</p>
                </div>
                <div className={Styles.navChatsNav}>
                    <Link to={'/chats/newMessage'}>
                        <MessageSquareDiff className={Styles.lucideNewMessage} />
                    </Link>
                </div>
            </div>
            <div className={Styles.chats_list}>
                {data?.map((user) => <Chat key={user.id} id={user.id} firstname={user.firstname} lastname={user.lastname}/>)}
            </div>
        </div>
    )
}

export default Chats