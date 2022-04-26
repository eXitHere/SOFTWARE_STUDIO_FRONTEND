import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from '../apiclient'
import classNames from 'classnames'
import { dateRelative } from 'utils/date'
import { Screen } from 'components/layouts/Screen'
import { Content } from 'components/common/Content'
import { PostComment } from 'components/common/PostComment'
import { CommentCard } from 'components/common/CommentCard'
import { Navbar } from 'components/common/Navbar'
import { UpdateContext } from 'contexts/store'
import Loader from 'components/loader'
import { Footer } from 'components/common/Footer'
import { LoadIcon } from 'components/common/loadIcon'

const commentsPerPage = 10
const Blog = () => {
  const { id } = useParams()

  const updateContext = useContext(UpdateContext)
  const [pageCount, setPageCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [blog, setBlog] = useState<any>({})
  const [comment, setComment] = useState<any[]>([])
  const [decoded, setDecoded] = useState<any>({})
  const [sortDate, setSortDate] = useState<boolean>(true)
  const [sortByDate, setSortByDate] = useState<boolean>(true)
  const [sortLike, setSortLike] = useState<boolean>(false)
  const [sortByLike, setSortByLike] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const getBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios(`https://thammathip.exitguy.studio/api/Blog/${id}`)
      const commentsCount = response.data.comments?.length
      const page = Math.ceil(commentsCount / commentsPerPage)
      if (page > 0) {
        setPageCount(Math.ceil(commentsCount / commentsPerPage))
      } else {
        setPageCount(1)
      }
      setBlog(response.data)
      console.log(response.data)
      setComment(response.data.comments)
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

  const FilterButton = () => {
    return (
      <div className="flex flex-row justify-end w-11/12 mb-4 md:w-4/5 ">
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
          className={classNames('flex items-center justify-center h-12 p-4 font-semibold  rounded-xl', {
            'bg-green-500 hover:bg-green-600 text-white': sortByLike == true,
            'bg-primary-light hover:bg-white': sortByLike == false,
          })}
        >
          ถูกใจ {sortLike ? '▼' : '▲'}
        </button>
      </div>
    )
  }

  const Pagination = () => {
    return (
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
    )
  }

  useEffect(() => {
    if (window.localStorage.getItem('accessToken') == null) {
      window.localStorage.setItem('auth', 'NO')
      console.log('...')
    } else {
      const token = window.localStorage.getItem('accessToken')
      const userData = JSON.parse(
        JSON.stringify(jwt_decode(token || '{}')).replace(
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
          'role',
        ),
      )
      console.log(userData)
      setDecoded(userData)
    }
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('auth') == 'YES') {
      const token = window.localStorage.getItem('accessToken')
      console.log(token)
      setDecoded(jwt_decode(token || '{}'))
    }
    getBlogs()
  }, [updateContext.update, updateContext.updateComment, updateContext.updateLikeComment])

  useEffect(() => {
    if (sortByLike) {
      if (sortLike) {
        let dataSort = [...blog.comments]
        dataSort = dataSort.sort((a: any, b: any) => a.like - b.like).reverse()
        setComment(dataSort)
      } else {
        let dataSort = [...blog.comments]
        dataSort = dataSort.sort((a: any, b: any) => a.like - b.like)
        setComment(dataSort)
      }
    } else if (sortByDate) {
      if (!sortDate) {
        let dataSort = [...blog.comments]
        dataSort = dataSort.reverse()
        setComment(dataSort)
      } else {
        setComment(blog.comments)
      }
    }
  }, [sortLike, sortDate])

  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.display_name} />
      {blog && !loading ? (
        <Content
          blog_id={blog.blog_id}
          topic={blog.topic}
          content={blog.content}
          category={blog.category}
          like_users={blog.like_users}
          like={blog?.like}
          createdDate={blog.created_date}
          author_name={blog.author?.name}
          author_id={blog.author?.user_id}
          username={decoded.username}
          updated_date={blog.updated_date}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-11/12 mt-36 lg:w-4/5 md:mt-28 drop-shadow-md h-96">
          <LoadIcon />
        </div>
      )}

      {window.localStorage.getItem('auth') == 'YES' ? (
        <>
          <div className="flex flex-col w-11/12 mt-4 mb-4 md:w-4/5">
            <p className="text-xl font-semibold text-white">เพิ่มความเห็น</p>
          </div>
          <PostComment
            name={decoded.display_name}
            blog_id={blog.blog_id}
            comment_count={String(blog.comments?.length)}
            post={true}
            comment_id={''}
            comment={''}
            close={() => {}}
          />
        </>
      ) : null}
      <div className="flex flex-col w-11/12 mt-4 mb-4 md:w-4/5">
        <p className="text-xl font-semibold text-white">{`ความเห็นทั้งหมด : ${
          decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin'
            ? blog.comments?.length
            : blog.comments?.filter((e: any) => e.author)?.length
        }`}</p>
      </div>
      <FilterButton />
      {blog.comments ? (
        blog.comments.length != 0 ? (
          comment?.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage).map((data: any) => {
            return !data.author ? (
              decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin' ? (
                <CommentCard
                  key={data.comment_id}
                  login_id={decoded.id}
                  login_name={decoded.username}
                  comment_id={data.comment_id}
                  user_id={data.author?.user_id}
                  name={data.author?.name}
                  comment={data.comment}
                  like={data.like}
                  like_users={data.like_users}
                  created_date={data.created_date}
                  updated_date={data.updated_date}
                  user_role={decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}
                />
              ) : null
            ) : (
              <CommentCard
                key={data.comment_id}
                login_id={decoded.id}
                login_name={decoded.username}
                comment_id={data.comment_id}
                user_id={data.author?.user_id}
                name={data.author?.name}
                comment={data.comment}
                like={data.like}
                like_users={data.like_users}
                created_date={data.created_date}
                updated_date={data.updated_date}
                user_role={decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}
              />
            )
          })
        ) : (
          <div className="relative flex flex-col items-center justify-center w-11/12 h-32 mb-4 text-lg h-68 md:flex-row lg:w-4/5 bg-primary-lightest rounded-2xl">
            ยังไม่มีความเห็น
          </div>
        )
      ) : null}
      <Pagination />
      <Footer />
    </Screen>
  )
}

export default Blog
