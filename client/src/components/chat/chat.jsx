import { Link } from 'react-router-dom'
import Styles from './chat.module.css'
import { useGetMessageMutation } from '../../store/messageQueryApi/messageQueryApi'
import { useEffect, useState } from 'react'
import { socketApi } from '../../pages/messages/messages'
import { useSelector } from 'react-redux'

function Chat({ id, firstname, lastname }) {

    const [getMessage] = useGetMessageMutation()
    const [message, setMessage] = useState('')
    const sender = useSelector(state => state.auth.user?.id)

   
    const getMessageApi = async () => {
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
                <img src={`http://localhost:3000/api/getPhoto/${id}`} />
                <p><span>{firstname}</span><span>{lastname}</span></p>
               <p>{message.sender == sender ? 'вы' : 'он'} {message.message}</p>
            </Link>
        </div>
    )
}

export default Chat