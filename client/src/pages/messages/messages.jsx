import { Link, useParams } from 'react-router-dom'
import Styles from './messages.module.css'
import { ArrowLeft, SendHorizonal } from 'lucide-react'
import { useGetFriendQuery } from '../../store/friendsQueryApi/friendsQueryApi'
import { useForm } from 'react-hook-form'
import { useGetMessageMutation } from '../../store/messageQueryApi/messageQueryApi'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SubmitFile } from '../../hooks/submitFile'



export const socketApi = () => {
    const socket = (io(`${import.meta.env.VITE_WEBSOCKET}`))
    return socket
}



function Messages() {

    const { user } = SubmitFile()
    const sender = useSelector(state => state.auth.user?.id)
    const [getMessage] = useGetMessageMutation()
    const [message, setMessage] = useState([])
    console.log(message)
    const mess = [...message]
    mess.sort(function (a, b) {
        if (a.created_at > b.created_at) {
            return 1;
        }
        if (a.created_at < b.created_at) {
            return -1;
        }
        return 0;
    });


    const getMessageApi = async () => {
        const messages = await getMessage({ sender, recipient: id })
        setMessage(messages.data)
    }

    useEffect(() => {
        const socket = socketApi()
        getMessageApi()
        socket.on("connection", (socket) => {
            /*   console.log(socket.id); */
        });
        socket.on("connect", () => {
            /*  console.log(socket.id); */
        });
        socket.on("disconnect", () => {
            /* console.log(socket.id); */
        });
        socket.on('message', (messages) => {
            setMessage((prevMessage) => [...prevMessage, messages])
        })
    }, [])



    const { id } = useParams()
    const { data = [] } = useGetFriendQuery(id)
    const { register, handleSubmit } = useForm()

    const onSubmit = async (body) => {
        socketApi().emit('events', { ...body, recipient: +id, sender })
    }

    return (
        <div className={Styles.messages}>
            <div className={Styles.navMessages}>
                <Link to={'/chats'}>
                    <ArrowLeft className={Styles.lucideArrow} />
                </Link>
                <div className={Styles.friend}>
                    <Link>
                        <img width={'20px'} src={`${import.meta.env.VITE_URL}/api/getPhoto/${id}`} />                 
                        <p>{data?.firstname} {data?.lastname}</p>
                    </Link>
                </div>
            </div>
            <div className={Styles.chat}>
                {mess?.map((mess) => <div className={Styles.chat_item} key={mess.id}>
                    <img width={'45px'} height={'45px'} src={`${import.meta.env.VITE_URL}/api/getPhoto/${mess.recipient}`} />
                    <div>
                        <div><p style={{color: 'grey'}}>{mess?.nameSender}</p></div>
                    <p key={mess.id}>{mess.message}</p>
                    </div> 
                    <p>{Math.trunc((Math.abs(new Date() - new Date(mess.created_at)) / 1000) / 60)}</p>
                </div>)}
            </div>
            <div className={Styles.createMessage}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' placeholder='Сообщение' {...register('message')} />
                    <button><SendHorizonal /></button>
                </form>
            </div>
        </div>
    )
}

export default Messages