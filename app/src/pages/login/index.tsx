import { ChangeEvent, useState } from 'react'
import axios from '../apiclient'
import { useNavigate, Link } from 'react-router-dom'
import { Screen } from 'components/layouts/Screen'
import { Path } from 'routes'
import lotus from 'assets/images/lotus.png'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const userLogin = {
    username: username,
    password: password,
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
      <div className="flex flex-row items-center justify-center w-screen h-full justify">
        <div className="flex-col items-center justify-between hidden h-screen md:flex md:visible md:w-1/2 bg-primary-light">
          <img src={lotus} className="w-full h-full"></img>
        </div>
        <div className="flex flex-col items-center w-full h-screen md:w-1/2">
          <p className="text-4xl font-bold text-white mt-28">เข้าสู่ระบบ</p>
          <p className="w-1/2 pb-3 mt-32 text-lg text-white">ชื่อผู้ใช้</p>
          <input value={username} onChange={handleUsernameChange} className="w-1/2 h-8 p-2 mb-5 rounded-lg" />
          <p className="w-1/2 pb-3 text-lg text-white">รหัสผ่าน</p>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-1/2 h-8 p-2 mb-5 rounded-lg"
          />
          <div className="flex flex-col items-center justify-center w-full mt-20">
            <div className="flex flex-row justify-between">
              {/* <Link to={Path.Profile}> */}
              <button
                onClick={() => sendLogin()}
                className="flex items-center justify-center w-32 h-12 p-4 m-4 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 drop-shadow-lg"
              >
                เข้าสู่ระบบ
              </button>

              <Link to={Path.MainBlogs}>
                <button className="flex items-center justify-center w-32 h-12 p-4 m-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 drop-shadow-lg">
                  ไม่มีบัญชี
                </button>
              </Link>
            </div>
            <div className="flex flex-row justify-center p-4 m-4 mt-4">
              <p className="flex items-center justify-center text-white rounded-md">ยังไม่มีบัญชี</p>
              <Link to={Path.Register}>
                <p className="ml-2 font-semibold text-white underline hover:text-gray-200">สมัครสมาชิก</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default Login
