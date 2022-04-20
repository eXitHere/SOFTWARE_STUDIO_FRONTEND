import { useState, useContext, useEffect } from 'react'
import axios from 'pages/apiclient'
import { UpdateContext } from 'contexts/store'

// Component
import { Blog } from 'types'
import { ModalConfirm } from 'components/common/ModalConfirm'
import { Link } from 'react-router-dom'
import { Path } from 'routes'

// Photo
import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import trash from 'assets/icons/trash.png'
import tagIcon from 'assets/icons/tagIcon.png'

// Type
type BlogCardProps = Pick<Blog, 'blog_id' | 'author_name' | 'profile_image' | 'topic' | 'content' | 'category' | 'like' | 'like_users' | 'date' | 'username' | 'profile_page'>

export const BlogCard = ({
  blog_id,
  author_name,
  profile_image,
  topic,
  content,
  category,
  like,
  like_users,
  date,
  username,
  profile_page,
}: BlogCardProps) => {
  // useState
  const updateContext = useContext(UpdateContext)
  const [clickLike, setClickLike] = useState<boolean>(true)
  const [likePhoto, setLikePhoto] = useState<string>(unlikeImg)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>()
  const [, setIsModalOpen] = useState<boolean>(false)

  const sendLike = async () => {
    const response = await axios.patch(
      `https://thammathip.exitguy.studio/api/Blog/like/${blog_id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    if (updateContext.update == 'notlike'){
      updateContext.setUpdate('like')
    }
    else {
      updateContext.setUpdate('notlike')
    }
    // console.log(response)
    
  }

  const deleteBlog = async () => {
    const response = await axios.delete(`https://thammathip.exitguy.studio/api/Blog/delete/${blog_id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    updateContext.setUpdate('delete')
    console.log(response)
  }

  const handleLike = () => {
    if (like_users.includes(username) == false) {
      console.log('Like')
    } else {
      console.log('UnLike')
    }
    sendLike()
  }

  const handleModal = () => {
    open(<ModalConfirm warningText={'คุณแน่ใจใช่ไหมว่าต้องการลบกระทู้นี้'} close={close} agree={agree} />)
  }

  const open = (content: React.ReactNode) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const close = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const agree = () => {
    deleteBlog()
    setIsModalOpen(false)
    setModalContent(null)
    // delete
  }

  function extractContent(s: string) {
    const span = document.createElement('span')
    span.innerHTML = s
    return span.textContent || span.innerText
  }

  return (
    <div className="relative flex flex-col w-11/12 mb-4 h-80 md:flex-row md:h-48 lg:w-4/5 bg-primary-lightest rounded-2xl">
      {/* profile picture + name */}
      <div className="flex flex-row items-center w-full h-48 p-1 pt-0 mt-0 mr-4 md:justify-center md:w-1/6 md:flex-col lg:p-5 lg:pt-0 rounded-2xl">
        <img src={profile_image} className="w-12 h-12 mx-4 mt-2 bg-blue-300 rounded-full md:w-20 md:h-20 md:mx-0"></img>
        <p className="pt-2 text-md md:text-md">{author_name}</p>
      </div>
      <div className="flex flex-row w-full md:w-5/6">
        {/* topic + preview */}
        <div className="w-3/4 h-full p-5 pt-0 pr-0 md:pt-3">
          <Link to={`${Path.MainBlogs}/${blog_id}`}>
            <p className="text-xl font-bold md:text-2xl">{topic}</p>
          </Link>
          <div className="flex flex-row items-center my-1 mt-2">
            <img src={tagIcon} className="w-6 h-6 mr-2" />
            {category.map((cat, index) => {
              return (
                <p className="px-2" key={index}>
                  {cat}
                </p>
              )
            })}
          </div>
          <p className="py-2 text-sm lg:text-lg overflow: hidden; white-space: nowrap; ">
            {/* {content.slice(0, 160) + ' ...'} */}
            {extractContent(content).slice(0, 160) + ' ...'}
          </p>
        </div>

        {/* like + date */}
        <div className="flex flex-col items-center justify-start w-2/6 h-full p-2 pl-0 mr-0 md:w-1/4 md:p-5 rounded-2xl">
          {window.localStorage.getItem('auth') == 'YES' ? (
            <button onClick={handleLike} className="w-12 h-8 md:w-16 md:h-12">
              {like_users.includes(username) ? (
                <img src={likeImg} className="w-full h-full" />
              ) : (
                <img src={unlikeImg} className="w-full h-full" />
              )}
            </button>
          ) : (
            <button className="w-12 h-8 md:w-16 md:h-12">
              <img src={likeImg} className="w-full h-full" />
            </button>
          )}
          <p className="my-2 font-semibold">{like}</p>
          <p className="text-sm md:text-sm">{date}</p>
        </div>
      </div>
      
      {/* delete button */}
      {profile_page && (
        <button
          onClick={handleModal}
          className="absolute right-0 flex items-center justify-center w-8 h-8 mr-2 bg-red-400 bottom-3 rounded-xl"
        >
          <img src={trash} className="w-4 h-4"></img>
        </button>
      )}
      {modalContent}
    </div>
  )
}
