import React, { FormEvent, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AvatarGroup from 'react-avatar-group'
import searchIcon from 'assets/images/searchIcon.png'
import LoginIcon from 'assets/icons/loginIcon.png'
import LogoutIcon from 'assets/icons/logoutIcon.png'
import classNames from 'classnames'
import { Path } from 'routes'
import { SearchContext, UserContext } from 'contexts/store'
import axios from 'axios'

type NavbarProps = {
  username: string
  isBoards: boolean
}

type SearchBoxProps = {
  c: string
  searchContext: any
}

const SearchBox = ({ c, searchContext }: SearchBoxProps) => {
  return (
    <div className={`w-full ${c}`}>
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 w-full"
          placeholder="ค้นหาจากคำและหมวดหมู่"
          onChange={(e) => searchContext?.setKeyword(e.target.value)}
          value={searchContext?.keyword}
        />
      </div>
    </div>
  )
}

export const Navbar = ({ isBoards, username }: NavbarProps) => {
  const userContext = useContext(UserContext)
  const searchContext = useContext(SearchContext)
  const navigateTo = useNavigate()


  const handleLogout = async () => {
    try {
      const response = await axios.delete(`https://thammathip.exitguy.studio/auth/Session/logout`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      console.log(response)
      return navigateTo(Path.Login)
    } catch (e) {
      console.log(e)
    
  }
    window.localStorage.clear()
    console.log('Log Out')
  }

  // const handleSearch = (e: FormEvent) => {
  //   e.preventDefault()
  // }

  return (
    <div
      className={classNames(
        'fixed flex flex-col items-center w-full p-2 px-4 shadow-md z-100 md:h-24 md:px-8 bg-primary-main',
        {
          'h-36': isBoards,
          'h-24' : !isBoards
        },
      )}
    >
      <div className="flex items-center justify-between w-full">
        <Link to={Path.MainBlogs}>
          <p className="text-lg font-bold text-white hover:text-gray-200 md:text-3xl">ThammaThip</p>
        </Link>

        {isBoards && <SearchBox searchContext={searchContext} c="w-2/4 hidden md:block" />}

        <div className="flex items-center justify-center">
          {window.localStorage.getItem('auth') == 'YES' ? (
            <Link to={Path.Profile} className="flex items-center justify-center">
              <p className={'text-white hover:text-gray-200 px-3 text-center text-md md:text-xl'}>{username}</p>
              <div>
                {username ? (
                  <div className="w-12 h-12">
                    <AvatarGroup
                      avatars={[username]}
                      initialCharacters={1}
                      max={1}
                      size={50}
                      displayAllOnHover
                      shadow={1}
                    />
                  </div>
                ) : null}
              </div>
            </Link>
          ) : null}

          {window.localStorage.getItem('auth') == 'YES' ? (
            // <Link to={Path.Login}>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-12 h-12 m-4 ml-2 mr-0 bg-red-400 hover:bg-red-500 md:w-12 md:h-12 rounded-xl"
            >
              <img src={LogoutIcon} className="w-6 h-6" />
            </button>
          ) : (
            // </Link>
            <Link to={Path.Login}>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-12 h-12 m-4 ml-2 mr-0 bg-green-500 hover:bg-green-600 rounded-xl"
              >
                <img src={LoginIcon} className="w-8 h-8" />
              </button>
            </Link>
          )}
        </div>
      </div>
      {isBoards && (
        <div className="w-full">
          <SearchBox searchContext={searchContext} c="md:hidden" />
        </div>
      )}
    </div>
  )
}
