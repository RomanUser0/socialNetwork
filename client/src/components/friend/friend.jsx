import Styles from 'friend.module.css'



function Friend({user}) {


    

    return(             
        <div className={Styles.friend} key={user.id}>
                <div className={Styles.description}>
                    <img width={'40px'} src={isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault}></img>
                <p>{user.firstname} {user.lastname}</p>
                </div>
                <div>
                     <Link to={`/chats/messages/${user.id}`}><MessageCircle className={Styles.message}/></Link>
                </div>             
            </div>
    )
}


export default Friend