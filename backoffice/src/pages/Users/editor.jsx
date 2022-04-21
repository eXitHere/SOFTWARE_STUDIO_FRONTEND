import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../../api/user'
import Loader from '../../components/loader'

function Editor() {
  const { id } = useParams()
  const navigateTo = useNavigate()
  const [user, setUser] = useState({
    id: '-',
    username: '-',
    name: '-',
    role: '-',
    profile_image: null,
    banned: false,
    deleted: false,
    created_date: '2022-04-18T14:12:42.152Z',
    updated_date: '2022-04-18T14:12:42.152Z',
  })
  const [isLoading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)

    let fetchUser = await getUser(id)
    if (fetchUser) {
      setUser({ ...fetchUser })
    }

    setLoading(false)
  }, [])

  const handleChange = (e) => {
    if (e.target.id === 'banned') {
      setUser({
        ...user,
        banned: !user.banned,
      })
    } else {
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    Swal.fire({
      title: 'ยืนยันการแก้ไข',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const status = await updateUser(id, user)
        if (status) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            confirmButtonText: 'Close',
          })
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            confirmButtonText: 'Close',
          })
        }
      }
    })

    setLoading(false)
  }

  return (
    <div className="p-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 shadow-md flex flex-col justify-center items-center space-y-8">
          <div className="flex w-full justify-center mb-10">
            <Avatar size="16vh" className="p-2" name={user.name} />
            <div className="p-8 flex flex-col justify-center">
              <div className="text-2xl font-bold">{user.name}</div>
              <div>{user.role}</div>
            </div>
          </div>
          <div className="flex flex-row justify-around w-3/4">
            <div className="w-1/2">
              <div>
                <label>Name</label>
              </div>
              <input id="name" className="p-2 border w-3/4" value={user.name} onChange={handleChange} type="input" />
            </div>
            <div className="w-1/2">
              <div>
                <label>Username</label>
              </div>
              <input
                id="username"
                className="p-2 border w-3/4"
                value={user.username}
                onChange={handleChange}
                type="input"
              />
            </div>
          </div>
          <div className="flex flex-row justify-around w-3/4">
            <div className="w-1/2">
              <div>
                <label>Password</label>
              </div>
              <input
                id="password"
                className="p-2 border w-3/4"
                value={user.password}
                onChange={handleChange}
                placeholder="********"
                type="password"
              />
            </div>
            <div className="w-1/2">
              <div>
                <label>Status</label>
              </div>
              <button
                id="banned"
                className={`p-2 border w-3/4 text-white ${user.banned ? 'bg-red-400' : 'bg-green-400'}`}
                onClick={handleChange}
              >
                {user.banned ? 'banned' : 'normal'}
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-around w-3/4">
            <div className="w-1/2">
              <div>
                <label>Created At</label>
              </div>
              <span className="text-primary">{moment(user.created_date).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
            <div className="w-1/2">
              <div>
                <label>Updated At</label>
              </div>
              <span className="text-primary">{moment(user.updated_date).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
          </div>
          <div className="flex flex-row justify-center space-x-4 w-full">
            <button
              className={`p-4 border w-36 h-14 text-center items-center font-bold rounded-md text-white bg-green-400`}
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              className={`p-4 border w-36 h-14 text-center items-center font-bold rounded-md text-white bg-red-400`}
              onClick={() => {
                navigateTo('users')
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
