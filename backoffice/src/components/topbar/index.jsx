import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar'
import { getUserInfo } from '../../utils/user.utils'

function TopBar() {
  const [user, setUser] = useState({
    name: 'unknown',
    role: 'unknown',
    id: 'unknown',
  })

  useEffect(async () => {
    const tmp = await getUserInfo()
    setUser(tmp)
  }, [])

  return (
    <div className="w-full flex justify-end items-center shadow-md divide-x-2">
      <a href={`users/${user.id}`} className="flex flex-row p-4 cursor-pointer items-center">
        <Avatar size="5vh" className="rounded" name={user.display_name} />
        <div className="flex flex-col pl-2">
          <div className="font-bold">{user.display_name}</div>
          <div className="opacity-50">{user.role}</div>
        </div>
      </a>
      <a className="p-4 cursor-pointer text-red-400" href="logout">
        <span className="mr-2">ออกจากระบบ</span>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </div>
  )
}

export default TopBar
