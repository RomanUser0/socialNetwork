import Styles from './newMessFriends.module.css'



function NewMessFriends() {


    return (
        <Link to={`/chats/messages/${user.id}`} key={user.id}>
            <div className={Styles.friend}>
                <div className={Styles.description}>
                    <img width={'40px'} src={user?.id ? `${import.meta.env.VITE_URL}/api/getPhoto/${user.id}` : AvatarDefault}></img>
                    <p>{user.firstname} {user.lastname}</p>
                </div>
            </div>
        </Link>
    )
}


export default NewMessFriends