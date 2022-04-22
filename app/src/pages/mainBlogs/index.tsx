import { useState, useContext, useEffect } from 'react'
import axios from '../apiclient'
import jwt_decode from 'jwt-decode'

import { SearchContext, TagContext, UpdateContext } from 'contexts/store'

import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { Tag } from 'components/common/Tag'
import { ImageShow } from 'components/common/ImageShow'
import { BlogCard } from 'components/common/BlogCard'
import { Footer } from 'components/common/Footer'

const blogsPerPage = 5

export const MainBlogs = () => {
  const tagContext = useContext(TagContext)
  const searchContext = useContext(SearchContext)
  const updateContext = useContext(UpdateContext)

  const [pageCount, setPageCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [globalBlogs, setGlobalBlogs] = useState<any[]>([])
  const [searchBlogs, setSearchBlogs] = useState<any[]>([])
  const [decoded, setDecoded] = useState<any>({})

  const getUserBlogs = async () => {
    try {
      const response = await axios('https://thammathip.exitguy.studio/api/Blog/list')
      const blogsCount = response.data.blogs?.length
      const page = Math.ceil(blogsCount / blogsPerPage)
      if (page > 0) {
        setPageCount(Math.ceil(blogsCount / blogsPerPage))
      } else {
        setPageCount(1)
      }
      setGlobalBlogs(response.data.blogs)
      setSearchBlogs(response.data.blogs)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  function findCommonElements(arr1: string[], arr2: string[]) {
    return arr1.some((item) => arr2.includes(item))
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
        if (
          globalBlogs[i].topic.includes(keyword) &&
          findCommonElements(globalBlogs[i].category, tagContext.category)
        ) {
          searchData.push(globalBlogs[i])
        }
      } else {
        if (globalBlogs[i].topic.includes(keyword)) {
          searchData.push(globalBlogs[i])
        }
      }
    }

    if (keyword == '' && tagContext.category.length == 0) {
      setSearchBlogs(globalBlogs)
    } else {
      setSearchBlogs(searchData)
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('accessToken') == null) {
      window.localStorage.setItem('auth', 'NO')
    } else {
      const token = window.localStorage.getItem('accessToken')
      const userData = JSON.parse(
        JSON.stringify(jwt_decode(token || '{}')).replace(
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
          'role',
        ),
      )
      setDecoded(userData)
      console.log(userData)
    }
    getUserBlogs()
  }, [])

  useEffect(() => {
    searchFilter(searchContext.keyword)
  }, [searchContext.keyword, tagContext.category, updateContext.update])

  return (
    <Screen>
      <Navbar isBoards={true} username={decoded.display_name} />
      <div className="flex justify-center w-full mt-40 md:mt-28 drop-shadow-md">
        {searchContext.keyword.length === 0 && <ImageShow />}
      </div>

      <Tag />

      {searchBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage).map((data) => {
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
            profile_page={false}
          />
        )
      })}
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
    </Screen>
  )
}

export default MainBlogs
