import { AlignJustify, Compass, Home, MessageCircle } from 'lucide-react'
import Styles from './headerContent.module.css'
import { Link, Outlet } from 'react-router-dom'


function HeaderContent() {
    return (
        <div>
            <div className={Styles.headerContent}>
                <Link to={'/'}><Home /></Link>
                <Link><Compass /></Link>
                <Link to={'/chats'}><MessageCircle /></Link>
                <Link to={'/menu'}><AlignJustify /></Link>
            </div>
            <Outlet />
        </div>

    )
}


export default HeaderContent