import likeImg from 'assets/images/like.png'

import { Comment } from 'types'

// type CommentComponent = {
//   onClick: () => void
//   onChange: () => void
// }

type CommentCardProps = Pick<Comment, 'date' | 'like' | 'name' | 'photo' | 'text'>

export const CommentCard = ({ date, like, name, photo, text }: CommentCardProps) => {
  return (
    <div className="flex flex-col w-4/5 mb-4 bg-primary-lightest rounded-2xl">
      <div className="flex items-center justify-between h-36 ">
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <img src={photo} className="w-20 h-20 mt-2 bg-blue-300 rounded-full"></img>
          <p className="pt-2">{name}</p>
        </div>
        <div className="w-4/6 h-full p-5">
          <p className="text-xl font-bold"></p>
          <p className="py-2 text-md">{text}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <button className="w-16 h-12">
            <img src={likeImg} className="w-full h-full" />
          </button>
          <p className="my-2 font-semibold">{like}</p>
          <p className="text-sm">วันที่ : {date}</p>
        </div>
      </div>
    </div>
  )
}
