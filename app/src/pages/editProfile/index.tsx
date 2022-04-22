import React, { ChangeEvent, MouseEvent, useState, useContext, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Screen } from 'components/layouts/Screen'
import jwt_decode from 'jwt-decode'
import axios from '../apiclient'

import { ModalConfirm } from 'components/common/ModalConfirm'
import { Path } from 'routes'
import { UserContext } from 'contexts/store'
import { Navbar } from 'components/common/Navbar'
import { Footer } from 'components/common/Footer'

export const EditProfile = () => {
  const userContext = useContext(UserContext)
  const [displayname, setDisplayname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmpassword, setConfirmpassword] = useState<string>('')
  const [content, setContent] = useState<React.ReactNode>(null)
  const [, setIsModalOpen] = useState<boolean>(false)
  const [decoded, setDecoded] = useState<any>({})
  const navigateTo = useNavigate()

  const handleDisplaynameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayname(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmpassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmpassword(e.target.value)
  }

  function handleDeleteUser(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    open(<ModalConfirm warningText={'คุณแน่ใจใช่ไหมว่าต้องการลบบัญชีนี้'} close={close} agree={agree} />)
  }

  const open = (content: React.ReactNode) => {
    setContent(content)
    setIsModalOpen(true)
  }

  const close = () => {
    setIsModalOpen(false)
    setContent(null)
  }

  const agree = () => {
    setIsModalOpen(false)
    setContent(null)
  }

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    const decodedToken:any = jwt_decode(token || '{}')
    console.log(typeof(decodedToken))
    setDecoded(decodedToken)
    setDisplayname(decodedToken.display_name)
  }, [])

  const changeName = async () => {
    if (displayname == '') {
      alert('ชื่อใช้แสดงห้ามเว้นว่าง')
    } else {
      const response = await axios.patch(
        `https://thammathip.exitguy.studio/api/User/update`,
        {
          id: decoded.id,
          name: displayname,
          profile_image: '',
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      console.log(response)
      window.localStorage.clear()
      return navigateTo(Path.Login)
    }
  }

  const changePassword = async () => {
    if (password == '' && confirmpassword == '') {
      alert('รหัสผ่าน และยืนยันรหัสผ่านห้ามเว้นว่าง')
    } else if (password == confirmpassword) {
      const response = await axios.patch(
        `https://thammathip.exitguy.studio/api/User/resetpass`,
        {
          password: password,
          confirm_password: confirmpassword,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      console.log(response)
      window.localStorage.clear()
      return navigateTo(Path.Login)
    } else {
      alert('รหัสผ่าน และยืนยันรหัสผ่านไม่ตรงกัน')
    }
  }

  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.display_name} />
      <div className="flex flex-col items-center justify-center md:mb-12 mt-44 md:mt-32">
        <p className="text-2xl font-bold text-white md:text-3xl">แก้ไขข้อมูลส่วนตัว</p>
        <div className="flex flex-col w-80 md:w-96">
          <p className="pb-3 mt-6 text-lg text-white">ชื่อใช้แสดง</p>
          <input
            value={displayname}
            onChange={handleDisplaynameChange}
            className="w-full h-8 p-2 mb-5 rounded-lg drop-shadow-md"
          />

          <div className="flex flex-row justify-center">
            <Link to={Path.Profile}>
              <button className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-gray-400 rounded-md drop-shadow-md hover:bg-gray-500">
                ยกเลิก
              </button>
            </Link>

            <button
              onClick={changeName}
              className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-green-400 rounded-md drop-shadow-md hover:bg-green-500"
            >
              บันทึก
            </button>
          </div>
          <p className="pb-3 text-lg text-white">รหัสผ่าน</p>
          <input
            value={password}
            onChange={handlePasswordChange}
            className="w-full h-8 p-2 mb-5 rounded-lg drop-shadow-md"
          />
          <p className="pb-3 text-lg text-white">ยืนยันรหัสผ่าน</p>
          <input
            value={confirmpassword}
            onChange={handleConfirmpassword}
            className="w-full h-8 p-2 mb-5 rounded-lg drop-shadow-md"
          />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-row justify-between">
              <Link to={Path.Profile}>
                <button className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-gray-400 rounded-md drop-shadow-md hover:bg-gray-500">
                  ยกเลิก
                </button>
              </Link>

              <button
                onClick={changePassword}
                className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-green-400 rounded-md drop-shadow-md hover:bg-green-600"
              >
                บันทึก
              </button>
            </div>
            <button
              onClick={handleDeleteUser}
              className="w-full h-12 mt-2 text-white bg-red-400 rounded-lg drop-shadow-md hover:bg-red-500"
            >
              ลบบัญชีผู้ใช้
            </button>
          </div>
        </div>
      </div>

      {content}
      <Footer />
    </Screen>
  )
}

export default EditProfile
