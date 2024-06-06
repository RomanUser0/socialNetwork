import { useForm } from 'react-hook-form'
import Styles from './login.module.css'
import { useState } from 'react'
import { createUserService } from '../../services/auth/createUser'
import { loginUserService } from '../../services/auth/loginUser'



function Login() {

    const [logReg, setLogReg] = useState(false)
    const { register, handleSubmit } = useForm()
    const { createUserfn } = createUserService()
    const { loginUser, isError } = loginUserService() 
    



    const submit = (body) => {
        if(logReg) {
             createUserfn(body)
             return
        }
            loginUser(body)
         
    }

    return (
        <div className={Styles.login}>
            <div className={Styles.iconSite}>
                <svg width="50px" height="50px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="bi bi-badge-vr-fill">
                    <path d="M9.673 5.933v1.938h1.033c.66 0 1.068-.316 1.068-.95 0-.64-.422-.988-1.05-.988h-1.05z" />
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm5.937 7 1.99-5.999H6.61L5.277 9.708H5.22L3.875 5.001H2.5L4.508 11h1.429zM8.5 5.001V11h1.173V8.763h1.064L11.787 11h1.327L11.91 8.583C12.455 8.373 13 7.779 13 6.9c0-1.147-.773-1.9-2.105-1.9H8.5z" />
                </svg>
                <h1>Вход ВРеале</h1>
            </div>
            <form className={Styles.form} onSubmit={handleSubmit(submit)}>
                {logReg ? <input type='text' placeholder='firstname' {...register('firstname')} /> : null}
                {logReg ? <input type='text' placeholder='lastname' {...register('lastname')} /> : null}
                <input type='email' placeholder='email' {...register('email')} />
                {isError ? <div>Такого пользователя не существует</div> : <div></div>}
                <input type='password' placeholder='password' {...register('password')} />
                <button>{logReg ? 'Продолжить' : 'Войти'}</button>

            </form>            
            <div>
                <button className={Styles.registr} onClick={() => setLogReg(!logReg)}>Зарегестрироваться</button>
            </div> 
        </div>
    )
}

export default Login