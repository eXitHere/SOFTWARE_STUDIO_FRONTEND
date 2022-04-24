import { ChangeEvent, useState } from 'react'
import axios from 'pages/apiclient'
import { useNavigate, Link } from 'react-router-dom'
import { Screen } from 'components/layouts/Screen'
import { Path } from 'routes'
import lotus from 'assets/images/lotus.png'
import { setDefaultResultOrder } from 'dns'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigateTo = useNavigate()

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleDisplaynameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayname(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const userRegister = {
    username: username,
    name: displayname,
    password: password,
    confirm_password: confirmPassword,
  }

  const validate = () => {
    if (username==='' || password==='' || confirmPassword===''){
      alert("กรุณาใส่ข้อมูลให้ครบ")
      return false
    }
    else if (confirmPassword !== password) {
      alert('รหัสผ่านไม่ตรงกัน')
      return false
    }
    else return true
  }

  const sendRegister = async () => {
    try {
      if (validate()){
        const response = await axios.post('https://thammathip.exitguy.studio/auth/Session/register', userRegister)
        console.log(response)
        return navigateTo(Path.Login)
      }
      
    }
    catch(e) {
      console.log(e)
      alert("ผู้ใช้นี้ถูกสมัครไปแล้ว")
    }
  }
  

  return (
    <Screen>
      <div className="flex flex-row items-center justify-center w-screen h-full justify">
        <div className="flex-col items-center justify-between hidden h-screen md:flex md:visible md:w-1/2 bg-primary-light">
          <img src={lotus} className="w-full h-full"></img>
        </div>
        <div className="flex flex-col items-center w-full h-screen md:w-1/2">
          <p className="text-4xl font-bold text-white mt-28">สมัครสมาชิก</p>
          <div className="flex flex-col items-center m-4 mt-12 w-96 md:w-full">
            <p className="w-1/2 text-lg text-white">ชื่อผู้ใช้</p>
            <input
              value={username}
              onChange={handleUsernameChange}
              className="w-1/2 p-1 mt-4 rounded-lg drop-shadow-md"
            ></input>
          </div>
          <div className="flex flex-col items-center m-4 mt-2 w-96 md:w-full">
            <p className="w-1/2 text-lg text-white">ชื่อใช้แสดง</p>
            <input
              value={displayname}
              onChange={handleDisplaynameChange}
              className="w-1/2 p-1 mt-4 rounded-lg drop-shadow-md"
            ></input>
          </div>
          <div className="flex flex-col items-center m-4 mt-2 w-96 md:w-full">
            <p className="w-1/2 text-lg text-white">รหัสผ่าน</p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-1/2 p-1 mt-4 rounded-lg drop-shadow-md"
            ></input>
          </div>
          <div className="flex flex-col items-center m-4 mt-2 w-96 md:w-full">
            <p className="w-1/2 text-lg text-white">ยืนยันรหัสผ่าน</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-1/2 p-1 mt-4 rounded-lg drop-shadow-md"
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={sendRegister}
              className="w-32 p-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600 drop-shadow-md font-md"
            >
              สมัคร
            </button>
            <div className="flex flex-row justify-center mt-8">
              <p className="text-white "> หากมีบัญชีอยู่แล้ว</p>
              <Link to={Path.Login}>
                <p className="ml-2 font-semibold text-white underline hover:text-gray-200">เข้าสู่ระบบ</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

export default Register
