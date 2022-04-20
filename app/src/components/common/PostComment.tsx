import { ChangeEvent, useState } from 'react'
import { AddComment } from 'types'

type AddCommentProps = Pick<AddComment,| 'name' | 'profile_image'>
export const PostComment = ({name, profile_image}:AddCommentProps) => {
  const [commentText, setCommentText] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }

  const handleComment = () => {
    console.log(commentText)
    setCommentText('')
  }

  return (
    <div className="relative flex flex-col w-11/12 h-68 md:flex-row md:h-36 lg:w-4/5 lg:h-40 bg-primary-lightest rounded-2xl">
      {/* profile picture + name */}
      <div className="flex flex-row items-center w-full h-full p-1 mr-4 md:justify-center md:w-1/6 md:flex-col lg:p-5 rounded-2xl">
        <img src={profile_image} className="w-8 h-8 mx-4 mt-2 bg-blue-300 rounded-full md:w-20 md:h-20 md:mx-0"></img>
        <p className="pt-2 text-md md:text-md">{name}</p>
      </div>
      <div className="flex flex-row items-center w-full md:w-5/6">
        {/* topic + preview */}
        <div className="w-2/3 h-full p-5 pt-4 pr-0 md:w-3/4 md:pt-3">
          <form className="flex items-center justify-center h-full md:w-full">
            <textarea
              value={commentText}
              onChange={handleChange}
              rows={8}
              cols={50}
              className="w-full h-24 p-4 rounded-xl"
            />
          </form>
        </div>
        {/* like + date */}
        <div className="flex flex-col items-center justify-center w-2/6 h-full p-1 pl-0 m-5 mr-0 md:w-1/4 md:p-5 rounded-2xl">
          <button
            onClick={handleComment}
            className="flex items-center justify-center w-20 h-12 p-4 font-bold text-white bg-green-500 md:w-20 md:h-16 rounded-xl"
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  )
}
