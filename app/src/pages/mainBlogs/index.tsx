import { FormEvent, useState, useContext, useEffect } from 'react'
import axios from '../apiclient'
import jwt_decode from 'jwt-decode'

import { SearchContext, TagContext, UpdateContext } from 'contexts/store'

import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { Footer } from 'components/common/Footer'
import { Tag } from 'components/common/Tag'
import { ImageShow } from 'components/common/ImageShow'
import { BlogCard } from 'components/common/BlogCard'

import searchIcon from 'assets/images/searchIcon.png'

export const MainBlogs = () => {
  const tagContext = useContext(TagContext)
  const searchContext = useContext(SearchContext)
  const updateContext = useContext(UpdateContext)
  const [search, setSearch] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalBlogs, setGlobalBlogs] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchBlogs, setSearchBlogs] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [decoded, setDecoded] = useState<any>({})

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
  }

  const getUserBlogs = async () => {
    try {
      const response = await axios('https://thammathip.exitguy.studio/api/Blog/list')
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
      setDecoded(jwt_decode(token || '{}'))
    }
    getUserBlogs()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateContext.update])

  useEffect(
    () => {
      searchFilter(searchContext.keyword)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchContext.keyword, tagContext.category, updateContext.update],
  )

  return (
    <Screen>
      <Navbar isBoards={true} username={decoded.display_name} />
      {/* <form onSubmit={handleSearch} className="flex items-center justify-around w-11/12 h-10 mt-24 ml-0 md:hidden">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-11/12 p-1 rounded-md"
        />
        <div className="flex justify-end w-1/12 ml-4">
          <img onClick={handleSearch} src={searchIcon} className="w-8 h-8" />
        </div>
      </form> */}

      <ImageShow />

      <Tag />

      {searchBlogs.map((data) => {
        return (
          <BlogCard
            key={data.blog_id}
            blog_id={data.blog_id}
            author_name={data.author.name}
            // profile_image={data.author.profile_image}
            topic={data.topic}
            content={data.content}
            category={data.category}
            like={data.like}
            like_users={data.like_users}
            date={data.created_date.split('T')[0]}
            username={decoded.username}
            profile_page={false}
          />
        )
      })}
      <Footer />
    </Screen>
  )
}

export default MainBlogs
