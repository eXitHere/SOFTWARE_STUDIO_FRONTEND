import  { ChangeEvent, useState } from 'react'
import axios from '../apiclient'
import { useNavigate, Link } from 'react-router-dom'
import { Screen } from 'components/layouts/Screen'
import { Path } from 'routes'

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  
  const userLogin = {
    username: username,
    password: password
  }

  const sendLogin = async () => {
    const response = await axios.post('https://thammathip.exitguy.studio/auth/Session/login', userLogin)
    window.localStorage.setItem('accessToken', response.data.accessToken)
    window.localStorage.setItem('refreshToken', response.data.refreshToken)
    window.localStorage.setItem('anoucement', 'FALSE')
    window.localStorage.setItem('auth', 'YES')
    console.log(response)
    return navigateTo(Path.Profile)
  }

  return (
    <Screen>
      <div className="flex flex-col items-center w-screen h-screen">
        <div className="h-1/4">
          <p className="p-12 text-6xl font-bold text-white">ThammaTip</p>
        </div>

        <div className="flex flex-col w-80 h-3/4">
          <p className="w-full pb-3 text-lg text-white">ชื่อผู้ใช้</p>
          <input value={username} onChange={handleUsernameChange} className="w-full h-8 p-2 mb-5 rounded-lg" />
          <p className="pb-3 text-lg text-white">รหัสผ่าน</p>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full h-8 p-2 mb-5 rounded-lg"
          />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-row justify-between">
              {/* <Link to={Path.Profile}> */}
              <button
                onClick={() => sendLogin()}
                className="flex items-center justify-center w-32 h-12 p-4 m-4 mt-32 text-white bg-green-500 rounded-md"
              >
                เข้าสู่ระบบ
              </button>

              <Link to={Path.MainBlogs}>
                <button className="flex items-center justify-center w-32 h-12 p-4 m-4 mt-32 text-white bg-blue-500 rounded-md">
                  No Account
                </button>
              </Link>
            </div>
            <Link to={Path.Register}>
              <p className="flex items-center justify-center h-12 p-4 m-4 mt-4 text-white rounded-md">
                ยังไม่มีบัญชี สมัครเลย
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default Login
