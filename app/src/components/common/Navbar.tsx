import { useState } from 'react'
import { Link } from 'react-router-dom'

import profile1 from 'assets/images/profile1.jpeg'
import searchIcon from 'assets/images/searchIcon.png'

import { Path } from 'routes'

type NavbarProps = {
  isBoards: boolean
  // onClick: () => void
  // onChange: () => void
  // handleLogout: () => void
  // handleSearch: () => void
}

export const Navbar = ({ isBoards }: NavbarProps) => {
  const [search, setSearch] = useState('')

  const handleLogout = () => {
    console.log('Log Out')
  }

  const handleSearch = () => {
    console.log('Search')
  }

  return (
    <div className="fixed flex items-center justify-between w-full p-2 px-8 bg-primary-main">
      <Link to={Path.MainBlogs}>
        <p className="text-3xl text-white">ThammaTip</p>
      </Link>
      {isBoards && (
        <form className="flex items-center w-2/6 h-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-1 rounded-md"
          />
          <img src={searchIcon} className="w-8 h-8 mx-2" />
        </form>
      )}
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          <p className={'text-white px-5 text-xl'}>User001</p>
          <Link to={Path.Home}>
            <img src={profile1} className="w-16 h-16 mt-2 bg-blue-300 rounded-full"></img>
          </Link>
        </div>
        <button
          className="flex items-center justify-center h-12 ml-4 text-white bg-red-400 rounded-md w-28"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}
