import { Link } from 'react-router-dom'
import Styles from './chat.module.css'
import { useGetMessageMutation } from '../../store/messageQueryApi/messageQueryApi'
import { useEffect, useState } from 'react'
import { socketApi } from '../../pages/messages/messages'
import { useSelector } from 'react-redux'
import { useGetUserMutation } from '../../store/authQueryApi/authQueryApi'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'

function Chat({ id, firstname, lastname }) {



    const [getUser] = useGetUserMutation()
    const [user, setUser] = useState()


  
    const [getMessage] = useGetMessageMutation()
    const [message, setMessage] = useState('')
    console.log(message)
   
    const sender = useSelector(state => state.auth.user?.id)

   
    const getMessageApi = async () => {
        const user = await getUser({ id: id })
        const messages = await getMessage({ sender, recipient: id })
        const mess = [...messages.data]
           mess.sort(function (a, b) {
        if ( a.created_at > b.created_at) {
          return 1;
        }
        if (a.created_at < b.created_at) {
          return -1;
        }
        return 0;
      });   
        setMessage(mess.at(-1))
        setUser(user.data)
    }

    useEffect(() => {
    
        const socket = socketApi()
        getMessageApi()       
        socket.on('message', (messages) => {
            setMessage(messages)
        })
    }, [])



   
      



    return (
        <div className={Styles.chats_item}>
            <Link to={`/chats/messages/${id}`}>
                <img src={user?.isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${id}` : AvatarDefault} />
                <p><span>{firstname}</span><span>{lastname}</span></p>
               {/*  <p>{message.sender == sender ? 'вы' : 'он'} {message.message}</p>  */}
            </Link>
        </div>
    )
}

export default Chat