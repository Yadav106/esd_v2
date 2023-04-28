import React, { useEffect, useState } from 'react'
import stp from '/stp.png'

const LoginPage = (props) => {
  const {isLogged, setIsLogged, username, setUsername, password, setPassword, data, setData} = props
  const [callBackend, setCallBackend] = useState(0)

  useEffect(() => {
    if (callBackend < 1) {
      return;
    }

    async function login() {
      const url = 'http://localhost:5001/authenticate'
      const data = {
        username: username,
        password: password
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = await response.json()
      if (json.status === 'success') {
        setData(json)
        setIsLogged(true)
      }
    }

    login()
  }, [callBackend])

  return (
    <div className='flex'>
        <div className='bg-gray-300 h-[97.5vh] w-[800px] m-[10px] rounded-[15px] overflow-hidden'>
          <img src={stp} alt='stp' className='h-[100%] w-[100%] rounded-[15px] object-contain' />
        </div>
        <div className='bg-gray-100 h-[97.5vh] w-[600px] m-[10px] rounded-[15px]'>
          <div className='flex flex-col justify-center items-center h-[100%]'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-4xl font-bold'>Login</h1>
              <div className='flex flex-col justify-center items-center'>
                <input type='text' placeholder='Username' className='border-2 border-gray-300 rounded-[15px] p-[10px] m-[10px] w-[300px]' 
                  onChange={(e) => setUsername(e.target.value)} value={username}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCallBackend(callBackend + 1)
                      }
                    }
                  }
                />
                <input type='password' placeholder='Password' className='border-2 border-gray-300 rounded-[15px] p-[10px] m-[10px] w-[300px]' 
                  onChange={(e) => setPassword(e.target.value)} value={password}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCallBackend(callBackend + 1)
                      }
                    }
                  }
                />
                <button className='border-2 border-gray-300 rounded-[15px] p-[10px] m-[10px] w-[300px] bg-gray-900 text-white font-bold'
                  onClick={() => setCallBackend(callBackend + 1)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoginPage