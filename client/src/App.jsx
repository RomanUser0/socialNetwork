import Login from './components/login/login'
import DefaultApp from './components/default/default'
import checkAuth from './services/checkAuth/checkAuth'




function App() {


  const { isAuth } = checkAuth()

  if (isAuth)
    return <DefaultApp />
  else {
    return <Login />
  }
}

export default App
