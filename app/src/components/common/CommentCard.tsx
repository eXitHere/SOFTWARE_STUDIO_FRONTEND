import { useState, useContext } from 'react'
import { UpdateContext } from 'contexts/store'
import AvatarGroup from 'react-avatar-group'
import axios from 'pages/apiclient'
import { dateRelative } from 'utils/date'

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
    <div className="flex flex-col w-4/5 mb-4 h-68  bg-primary-lightest rounded-md">
      {/* profile picture + name */}
      <div className="flex flex-row w-full rounded-md justify-end">
        {/* topic + preview */}
        <div className="w-full py-6 pr-0">
          <p className="py-2 mb-8 ml-4 text-sm">{comment}</p>
        </div>
        <div className="flex w-20 m-2 justify-center">
          {user_id == login_id && (
            <>
              <button
                onClick={handleModal}
                className="flex items-center justify-center w-8 h-8 mr-2 bg-red-400 left-4 bottom-3 rounded-xl"
              >
                <img src={trash} className="w-4 h-4"></img>
              </button>
              <button
                onClick={handleUpdateCommentModal}
                className="flex items-center justify-center w-8 h-8 mr-2 bg-blue-400 left-14 bottom-3 rounded-xl"
              >
                <img src={edit} className="w-4 h-4"></img>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row p-4 rounded-2xl">
        {/* like + date */}
        <div className="flex flex-row pt-2 border-r-2 item-center justify-center pr-4 mr-4">
          <p className="my-2 font-semibold mr-2">{like}</p>
          {window.localStorage.getItem('auth') == 'YES' ? (
            <button onClick={handleLike} className="w-12 h-8">
              {like_users.includes(login_name) ? (
                <img src={likeImg} className="w-full h-full" />
              ) : (
                <img src={unlikeImg} className="w-full h-full" />
              )}
            </button>
          ) : (
            <button className="w-12 h-8">
              <img src={likeImg} className="w-full h-full" />
            </button>
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
                <div className=" w-12 h-12">
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
                  <p className="text-md">{name}</p>
                  <p className="text-sm italic mt-1 opacity-70">{dateRelative(created_date)}</p>
                </div>
              </div>
            </div>
          </div>
          {/* delete button */}
        </div>
      </div>
      {like_users.length > 0 ? (
        <div className="flex flex-row border-t-2 p-2 text-sm">ถูกใจโดย {like_users.join(', ')}</div>
      ) : (
        <div></div>
      )}
      {content}
      {updateCommentContent}
    </div>
  )
}
