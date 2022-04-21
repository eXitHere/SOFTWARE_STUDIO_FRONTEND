import {useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AvatarGroup from 'react-avatar-group'
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
  const [decoded, setDecoded] = useState<any>({})
  const [globalBlogs, setGlobalBlogs] = useState<any[]>([])

  const getUserBlogs = async () => {
    try {
      const response = await axios('https://thammathip.exitguy.studio/api/Blog/list')
      const userBlog:object[] = []
      const token = window.localStorage.getItem('accessToken')
      const value:any = jwt_decode(token || '{}')
      for (let i = 0; i < response.data.blogs.length; i++) {
        if (response.data.blogs[i].author.name === value.display_name){
          userBlog.push(response.data.blogs[i])
        }
      }
      console.log(userBlog)
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
      <Navbar isBoards={false} username={decoded.display_name} />
      <div className="flex flex-col items-center justify-center w-full mt-16">
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
          close={close}
        />
      )}
    </Screen>
  )
}

export default Profile