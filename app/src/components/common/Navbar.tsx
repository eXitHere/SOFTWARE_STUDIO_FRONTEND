import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import profile1 from 'assets/images/profile1.jpeg'
import searchIcon from 'assets/images/searchIcon.png'

import { Path } from 'routes'

type NavbarProps = {
  isBoards: boolean
}

export const Navbar = ({ isBoards }: NavbarProps) => {
  const [search, setSearch] = useState('')

  const handleLogout = () => {
    console.log('Log Out')
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    console.log(search)
  }

  return (
    <div className="fixed z-10 flex items-center justify-between w-full p-2 px-4 md:px-8 bg-primary-main">
      <Link to={Path.MainBlogs}>
        <p className="text-lg font-bold text-white md:text-3xl">ThammaTip</p>
      </Link>
      {isBoards && (
        <form onSubmit={handleSearch} className="items-center hidden w-2/6 h-10 md:flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-1 rounded-md"
          />
          <img onClick={handleSearch} src={searchIcon} className="w-8 h-8 mx-2 cursor-pointer" />
        </form>
      ) }

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          <p className={'text-white px-5 text-md md:text-xl'}>User001</p>
          <Link to={Path.Home}>
            <img src={profile1} className="w-12 h-12 bg-blue-300 rounded-full md:mt-2 md:w-16 md:h-16"></img>
          </Link>
        </div>
        <button
          className="flex items-center justify-center w-12 h-12 ml-4 text-sm text-white bg-red-400 rounded-md md:text-lg md:w-28"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}
