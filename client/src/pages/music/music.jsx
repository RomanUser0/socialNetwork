import Styles from './music.module.css'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { useState } from 'react'
import MyMusic from '../../components/myMusic/myMusic'
import SearchMusic from '../../components/searchMusic/searchMusic'


function Music() {

    const [isMusic, setIsMusic] = useState('myMusic')

    const activeButton = (button) => {
        setIsMusic(button)
    }

    return (
        <div className={Styles.music}>
            <div className={Styles.header}>
                <div>
                    <Link><ArrowLeft className={Styles.ArrowLeft} /></Link>
                </div>
                <div className={Styles.search}>
                    <input type='search' placeholder='Поиск' />
                    <Search className={Styles.lucideSearch} />
                </div>
            </div>
            <div className={Styles.nav}>
                <button className={isMusic === 'myMusic' ? Styles.activeButton : Styles.noActiveButton} onClick={() => setIsMusic('myMusic')}>Моя музыка</button>
                <button className={isMusic === 'searchMusic' ? Styles.activeButton : Styles.noActiveButton} onClick={() => setIsMusic('searchMusic')}>Поиск музыки</button>
            </div>
            {isMusic === 'myMusic' ?
                <MyMusic activeButton={activeButton}/>
                :
                <SearchMusic />
            }




        </div>
    )









}

export default Music