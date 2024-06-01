import Styles from './defaultApp.module.css'
import HeaderContent from '../headerContent/headerContent'
import AppRouter from '../../router/appRouter'




function DefaultApp() {




    return (
        <div className={Styles.content}>
                <AppRouter />
        </div>
    )
}

export default DefaultApp
