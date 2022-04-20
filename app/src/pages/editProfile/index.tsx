import React, { ChangeEvent, MouseEvent, useState, useContext } from 'react'
import axios from '../apiclient'
import { Link } from 'react-router-dom'
import { Screen } from 'components/layouts/Screen'

import { ModalConfirm } from 'components/common/ModalConfirm'
import { Path } from 'routes'
import { UserContext } from 'contexts/store'

export const EditProfile = () => {
  const userContext = useContext(UserContext)
  const [username, setUsername] = useState<string>('')
  const [displayname, setDisplayname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmpassword, setConfirmpassword] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const [image, setImage] = useState<string>(userContext?.user?.photo!)
  const [file, setFile] = useState<File | null>()
  const [content, setContent] = useState<React.ReactNode>(null)
  const [, setIsModalOpen] = useState<boolean>(false)

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

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
    // logout to login page
  }

  const changeName = async () => {
    const response = await axios.patch(
      `https://thammathip.exitguy.studio/api/User/update`,
      {
        name: "hermanX",
        profile_image: image,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    console.log(response)
  }

  const changePassword = async () => {
    const response = await axios.patch(
      `https://thammathip.exitguy.studio/api/User/update`,
      {
        password: 'hermanX',
        profile_image: image,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    console.log(response)
  }

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(e.target.files?.[0])
        setImage(reader.result as string)
      }
    }

    if (!e.target.files?.[0]) return
    reader.readAsDataURL(e.target.files?.[0])
  }

  return (
    <Screen>
      <div className="flex flex-col items-center justify-center">
        <p className="mt-12 text-2xl font-bold text-white md:text-3xl">แก้ไขข้อมูลส่วนตัว</p>
        <label htmlFor="image-upload">
          <img src={image} className="w-24 h-24 m-4 bg-red-400 rounded-full cursor-pointer" />
        </label>
        <input type="file" id="image-upload" onChange={imageHandler} hidden />
        <div className="flex flex-col w-80 md:w-96">
          <p className="pb-3 text-lg text-white">ชื่อใช้แสดง</p>
          <input value={displayname} onChange={handleDisplaynameChange} className="w-full h-8 p-2 mb-5 rounded-lg" />

          <div className="flex flex-row justify-center">
            <Link to={Path.Profile}>
              <button className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-gray-400 rounded-md">
                ยกเลิก
              </button>
            </Link>

            <button onClick={changeName} className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-green-400 rounded-md">
              บันทึก
            </button>
          </div>
          <p className="pb-3 text-lg text-white">รหัสผ่าน</p>
          <input value={password} onChange={handlePasswordChange} className="w-full h-8 p-2 mb-5 rounded-lg" />
          <p className="pb-3 text-lg text-white">ยืนยันรหัสผ่าน</p>
          <input value={confirmpassword} onChange={handleConfirmpassword} className="w-full h-8 p-2 mb-5 rounded-lg" />
          <div className="flex flex-col items-center justify-center w-full">
            <button onClick={handleDeleteUser} className="w-full h-12 mt-2 text-white bg-red-400 rounded-lg">
              ลบบัญชีผู้ใช้
            </button>
            <div className="flex justify-between flex-roe">
              <Link to={Path.Profile}>
                <button className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-gray-400 rounded-md">
                  ยกเลิก
                </button>
              </Link>

              <button onClick={changePassword} className="flex items-center justify-center w-20 h-12 p-4 m-4 text-white bg-green-400 rounded-md">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
      {content}
    </Screen>
  )
}

export default EditProfile
