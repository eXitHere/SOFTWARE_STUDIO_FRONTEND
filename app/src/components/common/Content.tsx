import { useState, useEffect } from 'react'

import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import DOMPurify from 'dompurify'

import { Detail } from 'types'

type ContentProps = Pick<Detail,'id' | 'topic' | 'content' | 'category' | 'like' | 'like_count' | 'createdDate' | 'name_detail' | 'user_id' | 'profile_image'>

export const Content = ({ id, topic, content, category, like, like_count, createdDate, name_detail, user_id, profile_image}: ContentProps) => {
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
    // console.log(content.replaceAll('<img', '<img className="text-center rounded-xl"'))
    console.log(content)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createMarkup = (html: any) => {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }

  return (
    <div className="flex flex-col w-11/12 mt-20 lg:w-4/5 md:mt-28">
      <div className="p-4 mt-4 rounded-xl bg-primary-light ">
        <p className="p-4 text-3xl font-bold">{topic}</p>
        <div
          className="p-4"
          dangerouslySetInnerHTML={createMarkup(content)}
        ></div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center p-1 py-1 md:p-4">
              <img src={profile_image} className="w-12 h-12 bg-red-200 rounded-full" />
              <p className="mx-4 text-md">{name_detail}</p>
            </div>
            <div className="flex items-center justify-center">
              <img onClick={handleLike} src={likePhoto} className="w-12 h-8 m-4 ml-0 cursor-pointer md:w-20 md:h-12" />
              <p className="pr-1 text-lg font-bold md:pr-3 md:text-xl">{like_count}</p>
            </div>
          </div>
          <p className="">{createdDate}</p>
        </div>
      </div>
    </div>
  )
}
