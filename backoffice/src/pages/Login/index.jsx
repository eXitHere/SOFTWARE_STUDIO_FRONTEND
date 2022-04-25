import React, { useEffect, useState } from 'react'
import { login } from '../../api/user'
import { getUserInfo } from '../../utils/user.utils'
import { useNavigate, useLocation } from 'react-router-dom'
import Lotus from '../../assets/images/lotus.png'
import isValidHttpUrl from '../../utils/url.utils'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [nextPath, setNextPath] = useState(null)
  const search = useLocation().search
  const navigateTo = useNavigate()

  const timeToHello = () => {
    const now = new Date().getHours()
    if (now >= 18) return 'ค่ำ'
    if (now >= 15) return 'เย็น'
    else if (now >= 12) return 'บ่าย'
    else return 'เช้า'
  }

  const submit = async () => {
    if (!username) {
      setError('username is required.')
      return
    }
    if (!password) {
      setError('password is required.')
      return
    }

    setLoading(true)
    const result = await login(username, password)
    if (result) {
      const userInfo = await getUserInfo()
      if (userInfo.role !== 'admin') {
        alert(`Good bye~`)
        return navigateTo('/logout')
      } else {
        if (nextPath) return navigateTo(nextPath)
        else return navigateTo('/')
      }
      // console.log(userInfo);
    } else {
      setError('username or password is invalid.')
    }

    setLoading(false)
  }

  const handleKeypress = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      submit()
    }
  }

  useEffect(() => {
    const next = new URLSearchParams(search).get('next')
    if (next && !isValidHttpUrl(next)) {
      setNextPath(next)
    }
    // console.log(next)
  }, [])

  return (
    <div className="h-screen w-screen bg-primary flex justify-center items-center">
      <div className="bg-secondary md:w-3/4 lg:w-2/4 h-96 flex items-center justify-around rounded">
        <div className="w-1/2 h-full ">
          <img className="object-scale-down w-full h-full" src={Lotus} />
        </div>
        <div className="w-1/2 flex flex-col justify-between items-center">
          <div className="flex flex-row">
            <p className="text-xl font-bold p-4 text-left">Login</p>
          </div>
          <p className="p-4">สวัสดีตอน{timeToHello()}</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeypress}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mypassword">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="mypassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              onKeyPress={handleKeypress}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                if (!loading) submit()
              }}
            >
              Login
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}

export default Login
