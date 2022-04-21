import React,{ FormEvent, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AvatarGroup from 'react-avatar-group'
// import profile1 from 'assets/images/profile1.jpeg'
import searchIcon from 'assets/images/searchIcon.png'
import LoginIcon from 'assets/icons/loginIcon.png'
import LogoutIcon from 'assets/icons/logoutIcon.png'


import { Path } from 'routes'
import { SearchContext, UserContext } from 'contexts/store'

type NavbarProps = {
  username: string
  isBoards: boolean
}

export const Navbar = ({ isBoards, username }: NavbarProps) => {
  
  const userContext = useContext(UserContext)
  const searchContext = useContext(SearchContext)
  
  // const [search, setSearch] = useState('')

  const handleLogout = () => {
    window.localStorage.clear()
    console.log('Log Out')
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    // console.log(searchContext.keyword)
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
            value={searchContext.keyword}
            onChange={(e) => searchContext.setKeyword(e.target.value)}
            className="w-full p-1 rounded-md"
          />
          <img onClick={handleSearch} src={searchIcon} className="w-8 h-8 mx-2 cursor-pointer" />
        </form>
      )}

      <div className="flex items-center justify-center">
        {window.localStorage.getItem('auth') == 'YES' ? (
          <div className="flex items-center justify-center">
            <p className={'text-white px-3 text-center text-md md:text-xl'}>{username}</p>
            <Link to={Path.Profile}>
              {username ? (
                <AvatarGroup
                  avatars={[username /* or IAvatar objects */]}
                  initialCharacters={1}
                  max={1}
                  size={50}
                  displayAllOnHover
                  shadow={1}
                />
              ) : null}
            </Link>
          </div>
        ) : null}

        {window.localStorage.getItem('auth') == 'YES' ? (
          <Link to={Path.Login}>
            <button className="flex items-center justify-center w-10 h-12 m-4 ml-2 mr-0 bg-red-400 md:w-12 md:h-12 rounded-xl">
              <img src={LogoutIcon} onClick={handleLogout} className="w-6 h-6" />
            </button>
          </Link>
        ) : (
          <Link to={Path.Login}>
            <button className="flex items-center justify-center w-10 h-12 m-4 ml-2 mr-0 bg-green-500 rounded-xl">
              <img src={LoginIcon} onClick={handleLogout} className="w-8 h-8" />
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
