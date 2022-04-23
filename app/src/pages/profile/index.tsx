import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AvatarGroup from 'react-avatar-group'
import { BlogCard } from 'components/common/BlogCard'
import { Navbar } from 'components/common/Navbar'
import { Screen } from 'components/layouts/Screen'
import { AnoucementModal } from 'components/common/AnoucementModal'

import { Path } from 'routes'

import { SearchContext, UpdateContext } from 'contexts/store'
import { Footer } from 'components/common/Footer'
import { LoadIcon } from 'components/common/loadIcon'

const blogsPerPage = 5

export const Profile = () => {
  const updateContext = useContext(UpdateContext)
  const searchContext = useContext(SearchContext)

  const [pageCount, setPageCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isBanner, setIsBanner] = useState<boolean>(true)
  const [decoded, setDecoded] = useState<any>({})
  const [globalBlogs, setGlobalBlogs] = useState<any[]>([])
  const [searchBlogs, setSearchBlogs] = useState<any[]>([])
  const [sortDate, setSortDate] = useState<boolean>(true)
  const [sortByDate, setSortByDate] = useState<boolean>(true)
  const [sortLike, setSortLike] = useState<boolean>(false)
  const [sortByLike, setSortByLike] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const getUserBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios('https://thammathip.exitguy.studio/api/Blog/list')
      const userBlog: object[] = []
      const token = window.localStorage.getItem('accessToken')
      const value: any = jwt_decode(token || '{}')
      for (let i = 0; i < response.data.blogs.length; i++) {
        if (response.data.blogs[i].author.name === value.display_name) {
          userBlog.push(response.data.blogs[i])
        }
      }
      const blogsCount = userBlog?.length
      const page = Math.ceil(blogsCount / blogsPerPage)
      if (page > 0) {
        setPageCount(Math.ceil(blogsCount / blogsPerPage))
      } else {
        setPageCount(1)
      }
      setGlobalBlogs(userBlog)
      setSearchBlogs(userBlog)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const pageUp = () => {
    if (currentPage + 1 <= pageCount) {
      const newPageValue = currentPage + 1
      setCurrentPage(newPageValue)
    }
  }

  const pageDown = () => {
    if (currentPage - 1 > 0) {
      const newPageValue = currentPage - 1
      setCurrentPage(newPageValue)
    }
  }

  const searchFilter = (keyword: string) => {
    const searchData: string[] = []

    for (let i = 0; i < globalBlogs.length; i++) {
      if (keyword == '') {
        if (globalBlogs[i].topic.includes(keyword)) {
          searchData.push(globalBlogs[i])
        }
      } else {
        if (globalBlogs[i].topic.includes(keyword)) {
          searchData.push(globalBlogs[i])
        }
      }
    }

    if (keyword == '') {
      if (sortByLike) {
        if (sortLike) {
          let dataSort = [...globalBlogs]
          dataSort = dataSort.sort((a: any, b: any) => a.like - b.like).reverse()
          setSearchBlogs(dataSort)
        } else {
          let dataSort = [...globalBlogs]
          dataSort = dataSort.sort((a: any, b: any) => a.like - b.like)
          setSearchBlogs(dataSort)
        }
      } else if (sortByDate) {
        if (!sortDate) {
          let dataSort = [...globalBlogs]
          dataSort = dataSort.reverse()
          setSearchBlogs(dataSort)
        } else {
          setSearchBlogs(globalBlogs)
        }
      }
    } else {
      if (sortByLike) {
        if (sortLike) {
          let dataSort = [...searchData]
          dataSort = dataSort.sort((a: any, b: any) => a.like - b.like).reverse()
          setSearchBlogs(dataSort)
        } else {
          let dataSort = [...searchData]
          dataSort = dataSort.sort((a: any, b: any) => a.like - b.like)
          setSearchBlogs(dataSort)
        }
      } else if (sortByDate) {
        if (!sortDate) {
          let dataSort = [...searchData]
          dataSort = dataSort.reverse()
          setSearchBlogs(dataSort)
        } else {
          setSearchBlogs(searchData)
        }
      }
    }
  }

  const FilterButton = () => {
    return (
      <div className="flex flex-row items-center justify-between w-11/12 mb-4 md:w-4/5">
        <div className="flex justify-start w-11/12 my-4 lg:w-4/5">
          <p className="text-xl font-bold text-white">กระทู้ทั้งหมดของฉัน</p>
        </div>
        <div className="flex flex-row">
          <button
            onClick={() => {
              setSortByDate(true)
              setSortByLike(false)
              setSortDate(!sortDate)
            }}
            className={classNames('flex items-center justify-center h-12 p-4 font-semibold  rounded-xl mr-2', {
              'bg-green-500 hover:bg-green-600 text-white': sortByDate == true,
              'bg-primary-light hover:bg-white': sortByDate == false,
            })}
          >
            เวลา {sortDate ? '▼' : '▲'}
          </button>
          <button
            onClick={() => {
              setSortByLike(true)
              setSortByDate(false)
              setSortLike(!sortLike)
              console.log(!sortLike)
            }}
            className={classNames('flex items-center justify-center h-12 p-4 font-semibold rounded-xl', {
              'bg-green-500 hover:bg-green-600 text-white': sortByLike == true,
              'bg-primary-light hover:bg-white': sortByLike == false,
            })}
          >
            ถูกใจ {sortLike ? '▼' : '▲'}
          </button>
        </div>
      </div>
    )
  }

  const close = () => {
    setIsBanner(false)
    window.localStorage.setItem('anoucement', 'TRUE')
  }

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    const userData = JSON.parse(
      JSON.stringify(jwt_decode(token || '{}')).replace(
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
        'role',
      ),
    )
    setDecoded(userData)
    getUserBlogs()
  }, [updateContext.update])

  useEffect(() => {
    searchFilter(searchContext.keyword)
  }, [searchContext.keyword, updateContext.update, sortDate, sortLike])

  return (
    <Screen>
      <Navbar isBoards={true} username={decoded.display_name} />
      <div className="flex flex-col items-center justify-center w-full mt-32 md:mt-20">
        {decoded.username ? (
          <div className="mt-10">
            <AvatarGroup
              avatars={[decoded.display_name]}
              initialCharacters={1}
              max={1}
              size={100}
              displayAllOnHover
              shadow={1}
            />
          </div>
        ) : null}
        <p className="p-2 text-3xl font-bold text-white">{decoded.display_name}</p>
        <p className="p-2 text-xl font-semibold text-white">{`กระทู้ : ${globalBlogs.length}`}</p>
        <div>
          <Link to={Path.EditProfile}>
            <button className="h-16 m-4 font-semibold bg-primary-light hover:bg-primary-lightest rounded-xl w-36">
              แก้ไขบัญชีผู้ใช้
            </button>
          </Link>
          <Link to={Path.CreateBlog}>
            <button className="h-16 m-4 font-semibold bg-primary-light hover:bg-primary-lightest rounded-xl w-36">
              ตั้งกระทู้ใหม่ +
            </button>
          </Link>
        </div>
      </div>
      {/* กระทู้ทั้งหมดของฉัน */}
      <div className="flex flex-col items-center w-full">
        
        <FilterButton />
        {/* blogs list */}
        {searchBlogs.length > 0 ? (
          searchBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage).map((data) => {
            return (
              <BlogCard
                key={data.blog_id}
                blog_id={data.blog_id}
                author_name={data.author.name}
                topic={data.topic}
                content={data.content}
                category={data.category}
                like={data.like}
                like_users={data.like_users}
                date={data.created_date.split('T')[0]}
                username={decoded.username}
                user_role={decoded.role}
                profile_page={true}
              />
            )
          })
        ) : loading ? (
          <div className="relative flex flex-col items-center justify-center w-11/12 h-24 mb-4 md:flex-row lg:w-4/5 rounded-2xl md:h-48">
            <LoadIcon/>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center w-11/12 h-24 mb-4 md:flex-row lg:w-4/5 bg-primary-lightest rounded-2xl md:h-48">
            <p>ไม่พบกระทู้ของคุณ</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center w-3/4">
        <button
          onClick={pageDown}
          className="w-16 h-12 mx-4 bg-primary-light hover:bg-primary-lightest rounded-xl drop-shadow-md"
        >
          {'<'}
        </button>
        <p className="w-32 text-center text-white">{`หน้า ${currentPage} จาก ${pageCount}`}</p>
        <button
          onClick={pageUp}
          className="w-16 h-12 mx-4 bg-primary-light hover:bg-primary-lightest rounded-xl drop-shadow-md"
        >
          {'>'}
        </button>
      </div>
      <Footer />
      {window.localStorage.getItem('anoucement') == 'FALSE' && <AnoucementModal close={close} />}
    </Screen>
  )
}

export default Profile
