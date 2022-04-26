import { useState, useContext, useEffect } from 'react'
import { UpdateContext } from 'contexts/store'
import AvatarGroup from 'react-avatar-group'
import draftToHtml from 'draftjs-to-html'
import axios from 'pages/apiclient'
import classNames from 'classnames'

import { Blog } from 'types'
import { ModalConfirm } from 'components/common/ModalConfirm'
import { Link } from 'react-router-dom'
import { Path } from 'routes'

import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import likeHover from 'assets/images/likeHover.png'
import unlikeHover from 'assets/images/unlikeHover.png'
import trash from 'assets/icons/trash.png'
import edit from 'assets/icons/edit.png'
import tagIcon from 'assets/icons/tagIcon.png'
import powerIcon from 'assets/icons/power.png'


type BlogCardProps = Pick<
  Blog,
  | 'blog_id'
  | 'author_name'
  | 'topic'
  | 'content'
  | 'category'
  | 'like'
  | 'like_users'
  | 'date'
  | 'username'
  | 'user_role'
  | 'profile_page'
>

export const BlogCard = ({
  blog_id,
  author_name,
  topic,
  content,
  category,
  like,
  like_users,
  date,
  username,
  user_role,
  profile_page,
}: BlogCardProps) => {
  const updateContext = useContext(UpdateContext)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [data, setData] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [likeData, setLikeData] = useState<number>(0)
  const [listLikeData, setListLikeData] = useState<any>([])

  const handleLike = async () => {
    const response = await axios.patch(
      `https://thammathip.exitguy.studio/api/Blog/like/${blog_id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )

    const updateData = await axios(`https://thammathip.exitguy.studio/api/Blog/${blog_id}`)
    setLikeData(updateData.data.like)
    setListLikeData(updateData.data.like_users)
    console.log(updateData.data.like)
  }

  const deleteBlog = async () => {
    const response = await axios.delete(`https://thammathip.exitguy.studio/api/Blog/delete/${blog_id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    updateContext.setUpdate(`DELETE ${blog_id}`)
    console.log(response)
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
  }

  function extractContent(s: string) {
    const span = document.createElement('span')
    span.innerHTML = s
    return span.textContent || span.innerText
  }

  useEffect(() => {
    if (content) {
      setData(draftToHtml(JSON.parse(content)))
    }
  }, [content])

  useEffect(() => {
    setLikeData(like)
    setListLikeData(like_users)
    // console.log(like_users)
  }, [])

  // const adminButton = () =>{
  //   let a = JSON.stringify()
  // }

  return (
    <div
      className={classNames(
        'relative flex flex-col w-11/12 mb-4 md:flex-row lg:w-4/5 bg-primary-lightest rounded-2xl',
        {
          'relative min-h-80': profile_page === true,
          'sm:min-h-96 md:min-h-60': profile_page === false,
          'drop-shadow-md': isModalOpen === false,
        },
      )}
    >
      {/* profile picture + name */}
      <div className="flex flex-row items-center w-full p-4 border-b-2 md:border-b-0 md:border-r-2 md:p-0 md:justify-center md:w-1/6 md:flex-col">
        {author_name ? (
          <div className="px-4">
            <AvatarGroup avatars={[author_name]} initialCharacters={1} max={1} size={50} displayAllOnHover shadow={1} />
          </div>
        ) : null}
        <p className="pt-2 text-center text-md md:text-md">{author_name}</p>
      </div>
      <div className="flex flex-row w-full md:w-5/6">
        {/* topic + preview */}
        <Link to={`${Path.MainBlogs}/${blog_id}`} className="w-3/4 h-full pl-4 pr-4 md:pt-10">
          <div className="mb-4 border-b-2">
            <p className="p-4 text-xl font-bold md:text-2xl">{topic}</p>
          </div>
          <div className="flex flex-row items-center my-1 mt-2">
            <img src={tagIcon} className="h-6 mr-2 wany6" />
            <p className="px-2">{category.join(', ')}</p>
          </div>
          <p className="py-2 mb-4 text-sm overflow: hidden; white-space: nowrap; opacity-70">
            {extractContent(data).slice(0, 165) + ' ...'}
          </p>
        </Link>

        {/* like + date */}
        <div className="flex flex-col items-center justify-center w-2/6 h-full mt-4 md:mt-0 md:w-1/4 rounded-2xl">
          {window.localStorage.getItem('auth') == 'YES' ? (
            <button onClick={handleLike} className="w-12 h-8 md:w-20 md:h-12 drop-shadow-md">
              {listLikeData?.map((e: { username: any }) => e.username)?.includes(username) ? (
                <img
                  src={likeImg}
                  onMouseOver={(e) => (e.currentTarget.src = likeHover)}
                  onMouseOut={(e) => (e.currentTarget.src = likeImg)}
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={unlikeImg}
                  onMouseOver={(e) => (e.currentTarget.src = unlikeHover)}
                  onMouseOut={(e) => (e.currentTarget.src = unlikeImg)}
                  className="w-full h-full"
                />
              )}
            </button>
          ) : (
            <div className="w-12 h-8 md:w-16 md:h-12">
              <img src={likeImg} className="w-full h-full" />
            </div>
          )}
          <p className="my-2 text-xl font-semibold">{likeData}</p>
          <p className="text-sm md:text-sm opacity-70">
            {date.split('-')[2] + '/' + date.split('-')[1] + '/' + String(parseInt(date.split('-')[0]) + 543)}
          </p>
        </div>
      </div>

      {/* delete button + edit button*/}
      {profile_page && (
        <>
          <button
            onClick={handleModal}
            className="absolute right-0 flex items-center justify-center w-8 h-8 mr-2 bg-red-400 drop-shadow-md hover:bg-red-500 bottom-3 rounded-xl"
          >
            <img src={trash} className="w-4 h-4"></img>
          </button>

          <Link to={`${Path.EditBlog}/${blog_id}`}>
            <button className="absolute flex items-center justify-center w-8 h-8 mr-2 bg-blue-400 drop-shadow-md hover:bg-blue-500 right-10 bottom-3 rounded-xl">
              <img src={edit} className="w-4 h-4"></img>
            </button>
          </Link>
        </>
      )}

      {/* admin button */}
      {user_role == 'admin' && (
        <>
          <a
            href={`https://backoffice-thammathip.exitguy.studio/blogs?id=${blog_id}&next=/blogs?id=${blog_id}`}
            // href={`http://localhost:3000/blogs?id=${blog_id}&next=/blogs?id=${blog_id}`}
            target="_blank"
            rel="noreferrer"
            className="absolute right-0 flex items-center justify-center w-8 h-8 mr-2 bg-yellow-400 drop-shadow-md hover:bg-yellow-500 top-2 bottom-3 rounded-xl"
          >
            <img src={powerIcon} className="w-4 h-4"></img>
          </a>
        </>
      )}

      {modalContent}
    </div>
  )
}
