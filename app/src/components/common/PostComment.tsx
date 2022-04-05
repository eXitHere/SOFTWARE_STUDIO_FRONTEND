import { useState } from 'react'
import profile1 from '../../assets/images/profile1.jpeg'
import like from '../../assets/images/like.png'

type PostComment = {
  onClick: () => void
  handleComment: () => void
}

const PostComment = () => {
  const [commentText,setCommentText] = useState("");
  const handleChange = (e: any) => {
    setCommentText(e.target.value)
  }
  const handleComment  = () => {
    console.log(commentText)
    setCommentText("")
  }
  return (
    <div className="flex flex-col w-4/5 bg-primary-lightest rounded-2xl">
      <div className="flex items-center justify-between h-36 ">
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <img src={profile1} className="w-20 h-20 mt-2 bg-blue-300 rounded-full"></img>
          <p className="pt-2">user101</p>
        </div>
        <form className="flex items-center justify-center w-4/6 h-full p-5">
          <textarea value={commentText} onChange={handleChange} rows={6} cols={50} className="w-full h-20 p-4 rounded-xl"></textarea>
        </form>
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <button onClick={handleComment} className="flex items-center justify-center w-20 h-16 p-8 bg-green-200 rounded-xl">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostComment
