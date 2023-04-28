import React, {useEffect, useState} from 'react'
import MainPage from './MainPage'
import LoginPage from './LoginPage'

const App = () => {

  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState({})

  return (
    <div>
      {
        isLogged ? 
        <MainPage setIsLogged={setIsLogged} username={username} password={password} data={data} setData={setData}/> :
        <LoginPage isLogged={isLogged} setIsLogged={setIsLogged} username={username} setUsername={setUsername} password={password} setPassword={setPassword} data={data} setData={setData}/>
      }
    </div>
  )
}

export default App