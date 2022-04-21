import { useState, useContext } from 'react'
import { UpdateContext } from 'contexts/store'
import AvatarGroup from 'react-avatar-group'
import axios from 'pages/apiclient'

import classNames from 'classnames'

import { ModalConfirm } from 'components/common/ModalConfirm'
import { ModalEditComment } from 'components/common/ModalEditComment'

import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import trash from 'assets/icons/trash.png'
import edit from 'assets/icons/edit.png'

import { Comment } from 'types'


type CommentCardProps = Pick<
  Comment,
  'login_id' | 'login_name' | 'comment_id' | 'user_id' | 'name' | 'comment' | 'like' | 'like_users' | 'created_date'
>

export const CommentCard = ({
  login_id,
  login_name,
  comment_id,
  user_id,
  name,
  comment,
  like,
  like_users,
  created_date,
}: CommentCardProps) => {
  const updateContext = useContext(UpdateContext)
  const [content, setContent] = useState<React.ReactNode>(null)
  const [updateCommentContent, setUpdateCommentContent] = useState<React.ReactNode>(null)
  const [, setIsModalOpen] = useState<boolean>(false)
  const [, setIsUpdateCommentModalOpen] = useState<boolean>(false)

  const sendLike = async () => {
    const response = await axios.patch(
      `https://thammathip.exitguy.studio/api/Comment/like/${comment_id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    if (updateContext.updateLikeComment.split(' ')[0] == 'UNLIKE') {
      updateContext.setUpdateLikeComment(`LIKE ${comment_id}`)
    } else {
      updateContext.setUpdateLikeComment(`UNLIKE ${comment_id}`)
    }
    // console.log(response)
  }

  const handleLike = () => {
    if (like_users.includes(login_name) == false) {
      console.log('Like')
    } else {
      console.log('UnLike')
    }
    sendLike()
  }

  const deleteComment = async () => {
    const response = await axios.delete(`https://thammathip.exitguy.studio/api/Comment/delete/${comment_id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    updateContext.setUpdateComment(`DELETE ${comment_id}`)
    console.log(response)
  }

  const handleModal = () => {
    open(<ModalConfirm warningText={'คุณแน่ใจใช่ไหมว่าต้องการลบความเห็นนี้'} close={close} agree={agree} />)
  }

  const handleUpdateCommentModal = () => {
    openUpdateComment(<ModalEditComment name={name} blog_id={""} comment_id={comment_id} comment={comment} close={closeUpdateCommentModal}/>)
  }

  const open = (content: React.ReactNode) => {
    setContent(content)
    setIsModalOpen(true)
  }

  const openUpdateComment = (updateCommentContent: React.ReactNode) => {
    setUpdateCommentContent(updateCommentContent)
    setIsUpdateCommentModalOpen(true)
  }

  const close = () => {
    setIsModalOpen(false)
    setContent(null)
  }

  const closeUpdateCommentModal = () => {
    setIsUpdateCommentModalOpen(false)
    setUpdateCommentContent(null)
  }

  const agree = () => {
    deleteComment()
    setIsModalOpen(false)
    setContent(null)
  }

  // const agreeUpdateComment = () => {
  //   setIsUpdateCommentModalOpen(false)
  //   setUpdateCommentContent(null)
  // }


  return (
    <div className="relative flex flex-col w-11/12 min-h-full mb-4 h-68 md:flex-row lg:w-4/5 bg-primary-lightest rounded-2xl">
      {/* profile picture + name */}
      <div
        className={classNames('flex flex-row items-center w-full p-1 mr-4  md:justify-center md:w-1/6 md:flex-col', {
          'md:pb-16': user_id == login_id,
        })}
      >
        {name ? (
          <div className="px-4 pt-2">
            <AvatarGroup avatars={[name]} initialCharacters={1} max={1} size={50} displayAllOnHover shadow={1} />
          </div>
        ) : null}

        <p className="pt-2 text-center text-md md:text-md">{name}</p>
      </div>
      <div className="flex flex-row w-full md:w-5/6">
        {/* topic + preview */}
        <div className="w-3/4 min-h-full py-6 pr-0">
          <p className="py-2 mb-8 ml-4 text-sm md:text-xl">{comment}</p>
        </div>

        {/* like + date */}
        <div className="flex flex-col items-center justify-center w-2/6 h-full p-2 md:w-1/4 md:p-0 rounded-2xl">
          {window.localStorage.getItem('auth') == 'YES' ? (
            <button onClick={handleLike} className="w-12 h-8 md:w-16 md:h-12">
              {like_users.includes(login_name) ? (
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
          <p className="text-sm md:text-sm">{created_date}</p>
        </div>
      </div>
      {/* delete button */}
      {user_id == login_id && (
        <>
          <button
            onClick={handleModal}
            className="absolute flex items-center justify-center w-8 h-8 mr-2 bg-red-400 left-4 bottom-3 rounded-xl"
          >
            <img src={trash} className="w-4 h-4"></img>
          </button>
          <button
            onClick={handleUpdateCommentModal}
            className="absolute flex items-center justify-center w-8 h-8 mr-2 bg-blue-400 left-14 bottom-3 rounded-xl"
          >
            <img src={edit} className="w-4 h-4"></img>
          </button>
        </>
      )}
      {content}
      {updateCommentContent}
    </div>
  )
}
