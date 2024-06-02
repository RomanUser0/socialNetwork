import { useDispatch, useSelector } from 'react-redux'
import Styles from './menu.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Blocks, Box, ChevronRight, Footprints, Gamepad2, LogOut, MessageSquareHeart, Music, SquarePlay, SquareUser, Users } from 'lucide-react'
import { logout } from '../../store/slices/authSlice'
import { SubmitFile } from '../../hooks/submitFile'
import AvatarDefault from '../../assets/images/defaultAvatar/defaultAvatar.jpg'




function Menu() {

    const id = useSelector(state => state.auth.user?.id)
    const { isPhoto } = SubmitFile()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(logout())
        localStorage.clear('token')
        navigate('/')
    }   

    return (
        <div className={Styles.menu}>
            <div className={Styles.headerMenu}>
                <div className={Styles.wrapper}>
                    <Link to={'/'}><img src={isPhoto ? `${import.meta.env.VITE_URL}/api/getPhoto/${user?.id}` : AvatarDefault} /></Link>
                <p>Сервисы</p>
                </div>
                    <div>
                        <button onClick={logOut} className={Styles.exit}><LogOut className={Styles.lucideExit}/></button>
                    </div>
            </div>
            <div className={Styles.menu_list}>
                <ul>
                    <li>
                        <Link to={'/friends'}>
                            <Users className={Styles.lucideFriends} />
                            <p>Друзья</p>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <SquareUser className={Styles.lucideSocial} />
                            <p>Сообщества</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/music'}>
                            <Music className={Styles.lucideMusic} />
                            <p>Музыка</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/video'}>
                            <SquarePlay className={Styles.lucideVideo} />
                            <p>Видео</p>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <Gamepad2 className={Styles.lucideGames} />
                            <p>Игры</p>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <Footprints className={Styles.lucideFootsprint} />
                            <p>Шаги</p>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <MessageSquareHeart className={Styles.lucideLove} />
                            <p>Знакомства</p>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <Blocks className={Styles.lucideMarket} />
                            <p>Маркет</p>
                        </Link>
                    </li>
                </ul>
                <div className={Styles.allService}>
                    <Link>
                    <div>
                        <Box className={Styles.lucideBox}/>
                <p>Все сервисы</p> 
                    </div>
                <ChevronRight className={Styles.lucideChevronRight}/>
                    </Link>
                    </div> 

            </div>
        </div>
    )
}

export default Menu