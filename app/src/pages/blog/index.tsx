import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from '../apiclient'
import { dateRelative } from 'utils/date'
import { Screen } from 'components/layouts/Screen'
import { Content } from 'components/common/Content'
import { PostComment } from 'components/common/PostComment'
import { CommentCard } from 'components/common/CommentCard'
import { Navbar } from 'components/common/Navbar'
import { UpdateContext } from 'contexts/store'
import Loader from 'components/loader'

const Blog = () => {
  const { id } = useParams()
  const updateContext = useContext(UpdateContext)
  const [blog, setBlog] = useState<any>({})
  const [decoded, setDecoded] = useState<any>({})

  const getBlogs = async () => {
    try {
      const response = await axios(`https://thammathip.exitguy.studio/api/Blog/${id}`)
      console.log(response.data.created_date)
      console.log()
      setBlog(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('auth') == 'YES') {
      const token = window.localStorage.getItem('accessToken')
      setDecoded(jwt_decode(token || '{}'))
    }
    getBlogs()
  }, [updateContext.updateComment, updateContext.updateLikeComment])

  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.display_name} />
      {blog ? (
        <Content
          blog_id={blog.id}
          topic={blog.topic}
          content={blog.content}
          category={blog.category}
          like_users={blog?.like_users}
          like={blog?.like}
          createdDate={dateRelative(blog.created_date)}
          // createdDate={blog?.created_date}
          author_name={blog.author?.name}
          author_id={blog.author?.user_id}
          username={decoded.username}
        />
      ) : (
        <div className=" mt-20 lg:w-4/5 md:mt-28">
          <Loader />
        </div>
      )}

      {window.localStorage.getItem('auth') == 'YES' ? (
        <>
          <div className="flex flex-col w-4/5 mt-4 mb-4">
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
      <div className="flex flex-col w-4/5 mt-4 mb-4">
        <p className="text-xl font-semibold text-white">{`ความเห็นทั้งหมด : ${blog.comments?.length}`}</p>
      </div>
      {blog.comments ? (
        blog.comments.length != 0 ? (
          blog.comments.map((data: any) => {
            return (
              <CommentCard
                key={data.comment_id}
                login_id={decoded.id}
                login_name={decoded.username}
                comment_id={data.comment_id}
                user_id={data.author.user_id}
                name={data.author.name}
                comment={data.comment}
                like={data.like}
                like_users={data.like_users}
                created_date={data.created_date.split('T')[0]}
              />
            )
          })
        ) : (
          <div className="relative flex flex-col items-center justify-center w-11/12 h-32 mb-4 text-lg h-68 md:flex-row lg:w-4/5 bg-primary-lightest rounded-2xl">
            ยังไม่มีความเห็น
          </div>
        )
      ) : null}
    </Screen>
  )
}

export default Blog
