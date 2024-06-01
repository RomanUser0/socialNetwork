import { SquareArrowLeft, Image } from 'lucide-react'
import Styles from './myPhotos.module.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGetPhotosQuery } from '../../store/photoQueryApi/photoQueryApi'
import { SubmitFile } from '../../hooks/submitFile'



function MyPhotos() {

    const refPhotos = useRef()
    const { data } = useGetPhotosQuery()
    const { submitFile, uploadFile } = SubmitFile()

    const handleChangePhotos = async (event) => {
        submitFile(event, uploadPhotos, refPhotos, true)
    }

    return (
        <div className={Styles.myPhotos}>
            <div className={Styles.header}>
                <Link to={'/'}><SquareArrowLeft className={Styles.lucideHeader} /></Link>
                <h2>Мои фотографии</h2>
            </div>
            <div className={Styles.photosList}>
                <div className={Styles.navMyPhotos}>
                    <input onChange={handleChangePhotos} ref={refPhotos} type='file' multiple="mulpiple" />
                    <button onClick={() => uploadFile('more', refPhotos)}><Image className={Styles.lucideButton} /> Загрузить фото</button>
                </div>
                <div className={Styles.photos_list}>
                    {
                        data?.map((item) => <img width={'40px'} key={item.id} src={`${import.meta.env.VITE_URL}/api/getPhotos/${item.id}`} />)
                    }
                </div>
                <div className={Styles.photoLength}>
                    <p>{data?.length} фото</p>
                </div>
            </div>
        </div>
    )
}

export default MyPhotos