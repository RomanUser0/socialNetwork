import { Music2 } from 'lucide-react'
import  Styles  from './myMusic.module.css'



function MyMusic({activeButton}) {

    return(
        <div className={Styles.myMusic}>
            <div className={Styles.default}>
                <Music2 className={Styles.lucideMusic2}/>
                <p>У вас пока нет треков. Взгляните на те, что есть уже в VR Музыке</p>
                <button onClick={() => activeButton('searchMusic')}>Найти треки</button>
            </div>
        </div>
    )
}

export default MyMusic