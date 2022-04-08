import { useState } from 'react'
import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import trash from 'assets/images/trash.png'
import { BlogProfile } from 'types'

type BlogProfileCardProps = Pick<BlogProfile, 'date' | 'exText' | 'like' | 'name' | 'photo' | 'topic'>

export const BlogProfileCard = ({ date, exText, like, name, photo, topic }: BlogProfileCardProps) => {
  const [clickLike, setClickLike] = useState<boolean>(true)
  const [likePhoto, setLikePhoto] = useState<string>(unlikeImg)
  const handleLike = () => {
    setClickLike(!clickLike)
    if (clickLike === true) {
      console.log('Like')
      setLikePhoto(likeImg)
    } else {
      console.log('UnLike')
      setLikePhoto(unlikeImg)
    }
  }
  return (
    <div className="relative flex flex-col mb-4 h-68 md:flex-row md:h-48 md:w-3/5 w-80 lg:w-4/5 lg:h-40 bg-primary-lightest rounded-2xl">
      {/* profile picture + name */}
      <div className="flex flex-row items-center w-full h-full p-1 mr-4 md:justify-center md:w-1/6 md:flex-col lg:p-5 rounded-2xl">
        <img src={photo} className="w-12 h-12 mx-4 mt-2 bg-blue-300 rounded-full md:w-20 md:h-20 md:mx-0"></img>
        <p className="pt-2 text-md md:text-md">{name}</p>
      </div>
      <div className="flex flex-row w-full md:w-5/6">
        {/* topic + preview */}
        <div className="w-3/4 h-full p-5 pt-0 pr-0 md:pt-3">
          <p className="font-bold md:text-xl">{topic}</p>
          <p className="py-2 text-sm lg:text-lg">{exText.slice(0, 160) + ' ...'}</p>
        </div>
        {/* like + date */}
        <div className="flex flex-col items-center justify-center w-2/6 h-full p-2 pl-0 mr-0 md:w-1/4 md:p-5 rounded-2xl">
          <button onClick={handleLike} className="w-12 h-8 md:w-16 md:h-12">
            <img src={likePhoto} className="w-full h-full" />
          </button>
          <p className="my-2 font-semibold">{like}</p>
          <p className="text-sm md:text-sm">{date}</p>
        </div>
      </div>
      {/* delete button */}
      <button className="absolute right-0 flex items-center justify-center w-8 h-8 mr-2 bg-red-400 bottom-3 rounded-xl">
        <img src={trash} className="w-4 h-4"></img>
      </button>
    </div>
  )
}
