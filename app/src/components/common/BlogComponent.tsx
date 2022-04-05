import { useState } from 'react'
import like from "../../assets/images/like.png"
type BlogComponent = {
  onClick: () => void
  // onChange: () => void
  // handleLogout: () => void
}

type BlogComponentProps = {
  
  name: string
  photo: string
  topic: string
  exText: string
  like: number
  date: string
  
}
const BlogComponent = (props: BlogComponentProps) => {
  return (
    <div className="flex flex-col w-4/5 mb-4 bg-primary-lightest rounded-2xl">
      <div className="flex items-center justify-between h-36 ">
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <img src={props.photo} className="w-20 h-20 mt-2 bg-blue-300 rounded-full"></img>
          <p className="pt-2">{props.name}</p>
        </div>
        <div className="w-4/6 h-full p-5">
          <p className="text-xl font-bold">{props.topic}</p>
          <p className="py-2 text-md">{props.exText}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <button className="w-16 h-12">
            <img src={like} className="w-full h-full" />
          </button>
          <p className="my-2 font-semibold">{props.like}</p>
          <p className="text-sm">วันที่ : {props.date}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogComponent
