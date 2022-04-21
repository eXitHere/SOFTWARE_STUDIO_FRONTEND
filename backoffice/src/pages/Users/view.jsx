import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { listUser } from '../../api/user'
import Loader from '../../components/loader'

function List({ columns, data, sortHandler, sortBy }) {
  return (
    <table className="table-fixed w-full shadow-md bg-white rounded text-sm text-left text-gray-500 ">
      <thead className="h-12 text-xl bg-gray-50 rounded-lg text-gray-700 uppercase">
        <tr>
          {columns.map((col, idx) => (
            <th
              scope="col"
              className="px-6 py-3 font-bold hover:cursor-pointer select-none text-center "
              key={idx}
              id={col.accessor}
              onClick={(e) => sortHandler(e)}
            >
              {col.Header}
              {sortBy.key === col.accessor ? (
                sortBy.state ? (
                  <i className="ml-2 fa fa-angle-down" />
                ) : (
                  <i className="ml-2 fa fa-angle-up" />
                )
              ) : (
                <i />
              )}
            </th>
          ))}
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {data.map((user, idx) => (
          <tr key={idx} className=" border-b  odd:bg-white even:bg-gray-50">
            <td className="px-6 py-4">
              <Avatar size="4vh" name={user.name} />
              <span className="pl-2">{user.name || 'ไม่ได้กำหนด'}</span>
            </td>
            <td className="px-6 py-4 text-center">{user.username}</td>
            <td className={`text-center ${user.banned ? 'text-red-400' : 'text-green-400'}`}>
              {(user.banned ? 'banned' : 'normal').toUpperCase()}
            </td>
            <td className={`px-6 py-4 text-center ${user.role === 'admin' ? 'text-yellow-400' : 'text-gray-500'}`}>
              {user.role.toUpperCase()}
            </td>
            <td className="px-6 py-4 text-right">
              <a href={`users/${user.id}`} className="font-medium text-blue-600 hover:underline">
                Edit
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Users() {
  const [users, setUsers] = useState([])
  const [focusUsers, setFocusUser] = useState([])
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState({
    key: 'name',
    state: true,
  })
  const [filter, setFilter] = useState('')
  const perPage = 9

  useEffect(() => {
    setFocusUser(users.slice(perPage * (page - 1), perPage * page))
  }, [users, page])

  useEffect(() => {
    const sorted = []
      .concat(users)
      .sort((a, b) =>
        sortBy.state ? (a[sortBy.key] > b[sortBy.key] ? 1 : -1) : a[sortBy.key] < b[sortBy.key] ? 1 : -1,
      )

    setUsers(sorted)
  }, [sortBy])

  useEffect(() => {
    if (filter.length) {
      const filtered = users.filter((e) => e.name.includes(filter) || e.username.includes(filter))
      setFocusUser(filtered)
    } else {
      setFocusUser(users.slice(perPage * (page - 1), perPage * page))
    }
  }, [filter])

  const sortHandler = (e) => {
    const id = e.target.id
    if (sortBy.key !== id) {
      setSortBy({
        key: id,
        state: false,
      })
    } else {
      setSortBy({
        key: id,
        state: !sortBy.state,
      })
    }
  }

  const firstPage = () => {
    return page > 1
  }

  const lastPage = () => {
    return page < users.length / perPage
  }

  const pageUp = () => {
    if (lastPage()) setPage(page + 1)
    setFilter('')
  }

  const pageDown = () => {
    if (firstPage()) setPage(page - 1)
    setFilter('')
  }

  useEffect(async () => {
    const users = await listUser()
    setUsers(users)
  }, [])

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Status',
      accessor: 'banned',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
  ]

  return (
    <div className="p-5 h-full">
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  "
                placeholder="Search from topic or category"
                onChange={(e) => {
                  setFilter(e.target.value)
                }}
                value={filter}
              />
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex justify-center w-24">
              {focusUsers.length + perPage * (page - 1)} of {filter.length ? focusUsers.length : users.length}
            </div>
            <div className="flex justify-center w-full text-white space-x-2">
              <button
                className={`right-0 w-24 p-2 m-2 mr-0 font-bold  rounded-sm ${
                  firstPage() === false ? 'bg-gray-300' : 'bg-red-500'
                }`}
                onClick={() => {
                  pageDown()
                }}
                disabled={firstPage() === false}
              >
                prev
              </button>

              <button
                className={`right-0 w-24 p-2 m-2 mr-0 font-bold  rounded-sm ${
                  lastPage() === false ? 'bg-gray-300' : 'bg-green-500'
                }`}
                onClick={() => {
                  pageUp()
                }}
                disabled={lastPage() === false}
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        {focusUsers.length ? (
          <List className="" data={focusUsers} columns={columns} sortHandler={sortHandler} sortBy={sortBy} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}
export default Users
