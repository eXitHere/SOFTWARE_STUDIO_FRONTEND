import { ChangeEvent, useState, useContext, useEffect } from 'react'
import { AddComment } from 'types'
import { UpdateContext } from 'contexts/store'
import AvatarGroup from 'react-avatar-group'
import axios from '../../pages/apiclient'
type AddCommentProps = Pick<AddComment,'name' | 'blog_id' | 'comment_count' | 'post' | 'comment_id' | 'comment' | 'close' >
export const PostComment = ({name, blog_id, comment_count, post, comment_id, comment, close}:AddCommentProps) => {
  const updateContext = useContext(UpdateContext)
  const [commentText, setCommentText] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }

  const handleCreateComment = async () => {
    const sendData = {
      content: commentText,
      content_id: blog_id,
    }
    try {
      const response = await axios.post('https://thammathip.exitguy.studio/api/Comment/create', sendData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      console.log(response)
      updateContext.setUpdateComment(`POST COMMENT ${comment_count} OF ${blog_id}`)
      setCommentText("")
    } catch (e) {
      console.log(e)
    }
    console.log(sendData)
  }

  const handleUpdateComment = async () => {
    const sendData = {
      content: commentText
    }
    try {
      const response = await axios.patch(`https://thammathip.exitguy.studio/api/Comment/update/${comment_id}`, sendData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      console.log(response)
      updateContext.setUpdateComment(`UPDATE COMMENT ${commentText} OF ${blog_id}`)
      setCommentText('')
    } catch (e) {
      console.log(e)
    }
    console.log("Update")
    close()
  }

  useEffect(() => {
    if (!post) {
      setCommentText(comment)
    }
  }, [])
  return (
    <div className="relative flex flex-col w-11/12 drop-shadow-md h-68 md:flex-row md:h-36 lg:w-4/5 lg:h-40 bg-primary-lightest rounded-2xl">
      {/* profile picture + name */}
      <div className="flex flex-row items-center w-full h-full p-1 mr-4 md:justify-center md:w-1/6 md:flex-col lg:p-5 rounded-2xl">
        {name ? (
          <div className="px-4 pt-2">
            <AvatarGroup
              avatars={[name /* or IAvatar objects */]}
              initialCharacters={1}
              max={1}
              size={50}
              displayAllOnHover
              shadow={1}
            />
          </div>
        ) : null}
        <p className="pt-2 text-center text-md md:text-md">{name}</p>
      </div>
      <div className="flex flex-col items-center w-full md:flex-row md:w-5/6">
        {/* topic + preview */}
        <div className="w-full h-full p-5 pt-4 md:pr-0 md:w-3/4 md:pt-3">
          <div className="flex items-center justify-center w-full h-full md:w-full">
            <textarea
              value={commentText}
              onChange={handleChange}
              rows={8}
              cols={50}
              className="w-full h-24 p-4 rounded-xl "
            />
          </div>
        </div>
        {/* like + date */}
        <div className="flex flex-col items-center justify-center w-2/6 h-full pb-4 md:w-1/4 md:p-5 rounded-2xl">
          <button
            onClick={post ? handleCreateComment : handleUpdateComment}
            className="flex items-center justify-center w-20 h-12 p-4 font-bold text-white bg-green-500 drop-shadow-md hover:bg-green-600 md:w-20 md:h-16 rounded-xl"
          >
            {post ? 'ส่ง' : 'แก้ไข'}
          </button>
        </div>
      </div>
    </div>
  )
}
