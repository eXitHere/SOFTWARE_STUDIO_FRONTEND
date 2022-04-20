import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from '../apiclient'

import { Screen } from 'components/layouts/Screen'
import { Content } from 'components/common/Content'
import { PostComment } from 'components/common/PostComment'
import { CommentCard } from 'components/common/CommentCard'
import { Navbar } from 'components/common/Navbar'

import { Comment } from 'types'

import profile1 from 'assets/images/profile1.jpeg'

const Comments: Comment[] = [
  {
    id: '001',
    name: 'User101',
    photo: profile1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 100,
    date: '10/12/22',
  },
  {
    id: '002',
    name: 'User102',
    photo: profile1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 24,
    date: '9/4/22',
  },
]

const Blog = () => {
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blog, setBlog] = useState<any>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [decoded, setDecoded] = useState<any>({})

  const getBlogs = async () => {
      try {
        const response = await axios(`https://thammathip.exitguy.studio/api/Blog/${id}`)
        console.log(response.data)
        setBlog(response.data)
      } 
      catch (e) {
        console.log(e)
      }}
  
  useEffect(() => {
    if ( window.localStorage.getItem('auth') == 'YES') {
      const token = window.localStorage.getItem('accessToken')
      setDecoded(jwt_decode(token || '{}'))
    }
    getBlogs()
  },[])

  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.username} />
      <Content
        id={blog.id}
        topic={blog.topic}
        content={blog.content?.replaceAll('<img', '<img className="text-center rounded-xl"')}
        category={blog.category}
        like={blog.like}
        like_count={blog.like_users?.length}
        createdDate={blog.created_date?.split('T')[0]}
        name_detail={blog.author?.name}
        user_id={blog.author?.user_id}
        profile_image={blog.author?.profile_image}
      />
      {window.localStorage.getItem('auth') == 'YES' ? (
        <>
          <div className="flex flex-col w-4/5 mt-4 mb-4">
            <p className="text-xl font-semibold text-white">เพิ่มความเห็น</p>
          </div>
          <PostComment name={decoded.display_name} profile_image={''} />
        </>
      ) : null}
      <div className="flex flex-col w-4/5 mt-4 mb-4">
        <p className="text-xl font-semibold text-white">ความเห็นทั้งหมด</p>
      </div>{' '}
      {Comments.map(({ id, ...rest }) => {
        return <CommentCard key={id} {...rest} />
      })}
    </Screen>
  )
}

export default Blog
