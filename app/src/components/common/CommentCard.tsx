import { useState, useContext, useEffect } from 'react'
import { UpdateContext } from 'contexts/store'
import AvatarGroup from 'react-avatar-group'
import { dateRelative } from 'utils/date'
import axios from 'pages/apiclient'
import classNames from 'classnames'

import { ModalConfirm } from 'components/common/ModalConfirm'
import { ModalEditComment } from 'components/common/ModalEditComment'

import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import likeHover from 'assets/images/likeHover.png'
import unlikeHover from 'assets/images/unlikeHover.png'
import trash from 'assets/icons/trash.png'
import edit from 'assets/icons/edit.png'

import { Comment } from 'types'
import { ModalLikeUser } from './modalLikeUser'

type CommentCardProps = Pick<
  Comment,
  | 'login_id'
  | 'login_name'
  | 'comment_id'
  | 'user_id'
  | 'name'
  | 'comment'
  | 'like'
  | 'like_users'
  | 'created_date'
  | 'updated_date'
>

const maxUserDisplayed = 3

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
  updated_date,
}: CommentCardProps) => {
  const updateContext = useContext(UpdateContext)
  const [content, setContent] = useState<React.ReactNode>(null)
  const [updateCommentContent, setUpdateCommentContent] = useState<React.ReactNode>(null)
  const [likeUserContent, setLikeUserContent] = useState<React.ReactNode>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUpdateCommentModalOpen, setIsUpdateCommentModalOpen] = useState<boolean>(false)
  const [isLikeUserModalOpen, setIsLikeUserModalOpen] = useState<boolean>(false)

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
    if (like_users.map((e) => e.username).includes(login_name) == false) {
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
    openUpdateComment(
      <ModalEditComment
        name={name}
        blog_id={''}
        comment_id={comment_id}
        comment={comment}
        close={closeUpdateCommentModal}
      />,
    )
  }

  const handleLikeUserModal = () => {
    openLikeUser(<ModalLikeUser like_users={[{username:"a",name:"b"}]} close={closeLikeUser}/>)
  }

  const open = (content: React.ReactNode) => {
    setIsModalOpen(true)
    setContent(content)
  }

  const openUpdateComment = (updateCommentContent: React.ReactNode) => {
    setUpdateCommentContent(updateCommentContent)
    setIsUpdateCommentModalOpen(true)
  }

  const openLikeUser = (likeUserContent: React.ReactNode) => {
    setLikeUserContent(likeUserContent)
    setIsLikeUserModalOpen(true)
  }

  const close = () => {
    setIsModalOpen(false)
    setContent(null)
  }

  const closeUpdateCommentModal = () => {
    setIsUpdateCommentModalOpen(false)
    setUpdateCommentContent(null)
  }
  
  const closeLikeUser = () => {
    setIsLikeUserModalOpen(false)
    setLikeUserContent(null)
  }

  const agree = () => {
    deleteComment()
    setIsModalOpen(false)
    setContent(null)
  }

  return (
    <div
      className={classNames('flex flex-col w-11/12 mb-4 lg:w-4/5 rounded-2xl min-h-68 bg-primary-lightest', {
        // 'drop-shadow-md': isUpdateCommentModalOpen === false,
        // 'drop-shadow-lg': isLikeUserModalOpen === false,
      })}
    >
      {/* profile picture + name */}
      <div className="flex flex-row justify-end w-full rounded-md">
        {/* topic + preview */}
        <div className="w-full py-1 pr-0 md:py-6">
          <p className="py-2 mb-8 ml-4 text-sm md:text-lg">{comment}</p>
          <p className="mt-1 ml-4 text-sm italic opacity-60">
            {created_date !== updated_date && <div>แก้ไขเมื่อ {dateRelative(updated_date)}</div>}
          </p>
        </div>
        <div className="flex justify-center w-20 m-2">
          {user_id == login_id && (
            <>
              <button
                onClick={handleModal}
                className="flex items-center justify-center w-8 h-8 mr-2 bg-red-400 hover:bg-red-500 left-4 bottom-3 rounded-xl"
              >
                <img src={trash} className="w-4 h-4"></img>
              </button>
              <button
                onClick={handleUpdateCommentModal}
                className="flex items-center justify-center w-8 h-8 mr-2 bg-blue-400 hover:bg-blue-500 left-14 bottom-3 rounded-xl"
              >
                <img src={edit} className="w-4 h-4"></img>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row p-4 rounded-2xl">
        {/* like + date */}
        <div className="flex flex-row justify-center pt-2 pr-4 mr-4 border-r-2 item-center">
          <p className="my-2 mr-2 font-semibold">{like}</p>
          {window.localStorage.getItem('auth') == 'YES' ? (
            <button onClick={handleLike} className="w-12 h-8 drop-shadow-md">
              {like_users.map((e) => e.username).includes(login_name) ? (
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
            <div className="w-12 h-8">
              <img src={likeImg} className="w-full h-full" />
            </div>
          )}
        </div>
        {/* profile */}
        <div className="">
          <div
            className={classNames('flex flex-row items-center', {
              '': user_id == login_id,
            })}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 ">
                  {name ? (
                    <AvatarGroup
                      avatars={[name]}
                      initialCharacters={1}
                      max={1}
                      size={50}
                      displayAllOnHover
                      shadow={1}
                    />
                  ) : null}
                </div>
                <div className="ml-2">
                  <p className={`text-md ${!name && 'text-red-400'}`}>{name || 'Blocked User'}</p>
                  <p className="mt-1 text-sm italic opacity-70">{dateRelative(created_date)}</p>
                </div>
              </div>
            </div>
          </div>
          {/* delete button */}
        </div>
      </div>
      {like_users.length > 0 ? (
        <div
          className="flex flex-row p-2 text-sm border-t-2 cursor-pointer"
          onClick={() => {
            handleLikeUserModal()
          }}
        >
          ถูกใจโดย{' '}
          {like_users
            .slice(0, maxUserDisplayed)
            .map((e) => e.name)
            .join(', ')}{' '}
          {like_users.length > maxUserDisplayed ? 'และอีกหลายคน' : ''}
        </div>
      ) : (
        <div></div>
      )}
      {content}
      {updateCommentContent}
      {likeUserContent}
    </div>
  )
}
