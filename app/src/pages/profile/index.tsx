import {useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { BlogCard } from 'components/common/BlogCard'
import { Navbar } from 'components/common/Navbar'
import { Screen } from 'components/layouts/Screen'
import { AnoucementModal } from 'components/common/AnoucementModal'

import { UserContext } from 'contexts/store'
import { Path } from 'routes'

import { UpdateContext } from 'contexts/store'

export const Profile = () => {

  const userContext = useContext(UserContext)
  const updateContext = useContext(UpdateContext)

  const [isBanner, setIsBanner] = useState<boolean>(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [decoded, setDecoded] = useState<any>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalBlogs, setGlobalBlogs] = useState<any[]>([])

  const getUserBlogs = async () => {
    try {
      const response = await axios('https://thammathip.exitguy.studio/api/Blog/list')
      const userBlog:object[] = []
      const token = window.localStorage.getItem('accessToken')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value:any = jwt_decode(token || '{}')
      for (let i = 0; i < response.data.blogs.length; i++) {
        if (response.data.blogs[i].author.name === value.display_name){
          userBlog.push(response.data.blogs[i])
        }
      }
      setGlobalBlogs(userBlog)
    } catch (e) {
      console.log(e)
    }
  }

  const close = () => {
    setIsBanner(false)
    window.localStorage.setItem('anoucement', 'TRUE')
  }

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    setDecoded(jwt_decode(token || '{}'))
    getUserBlogs()
  }, [updateContext.update])

  
  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.username} />
      <div className="flex flex-col items-center justify-center w-full mt-16">
        <img src={userContext?.user?.photo} className="mt-8 mb-2 bg-red-200 rounded-full w-36 h-36"></img>
        <p className="p-2 text-3xl font-bold text-white">{decoded.username}</p>
        <p className="p-2 text-xl font-semibold text-white">กระทู้ : 1</p>
        <div>
          <Link to={Path.EditProfile}>
            <button className="h-16 m-4 font-semibold bg-primary-lightest rounded-xl w-36">แก้ไขบัญชีผู้ใช้</button>
          </Link>
          <Link to={Path.CreateBlog}>
            <button className="h-16 m-4 font-semibold bg-primary-lightest rounded-xl w-36">ตั้งกระทู้ใหม่ +</button>
          </Link>
        </div>
      </div>
      {/* กระทู้ทั้งหมดของฉัน */}
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-start w-11/12 my-4 lg:w-4/5">
          <p className="text-xl text-white">กระทู้ทั้งหมดของฉัน</p>
        </div>
        {/* blogs list */}
        {globalBlogs.map((data) => {
          return (
            <BlogCard
              key={data.blog_id}
              blog_id={data.blog_id}
              author_name={data.author.name}
              profile_image={data.author.profile_image}
              topic={data.topic}
              content={data.content}
              category={data.category}
              like={data.like}
              like_users={data.like_users}
              date={data.created_date.split('T')[0]}
              username={decoded.username}
              profile_page={true}
            />
          )
        })}
      </div>
      {window.localStorage.getItem('anoucement') == 'FALSE' && (
        <AnoucementModal
          topic={
            'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
          }
          text={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.'
          }
          date={'12/12/65'}
          close={close}
        />
      )}
    </Screen>
  )
}

export default Profile