import likeImg from 'assets/images/like.png'
import trash from 'assets/images/trash.png'
import { BlogProfile } from 'types'

// type BlogComponent = {
//   onClick: () => void
//   onChange: () => void
//   handleLogout: () => void
// }

type BlogProfileCardProps = Pick<BlogProfile, 'date' | 'exText' | 'like' | 'name' | 'photo' | 'topic'>

export const BlogProfileCard = ({ date, exText, like, name, photo, topic }: BlogProfileCardProps) => {
  return (
    <div className="flex flex-col h-64 mb-4 md:h-48 md:w-3/5 w-80 lg:w-4/5 lg:h-40 bg-primary-lightest rounded-2xl">
      <div className="flex items-center justify-between h-36 ">
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-1 lg:p-5 rounded-2xl">
          <img src={photo} className="w-12 h-12 mt-2 bg-blue-300 rounded-full md:w-20 md:h-20"></img>
          <p className="pt-2 text-sm md:text-md">{name}</p>
        </div>
        <div className="w-4/6 h-full p-5">
          <p className="font-bold md:text-xl">{topic}</p>
          <p className="py-2 text-sm lg:text-lg">{exText.slice(0, 160) + ' ...'}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/6 h-full p-5 rounded-2xl">
          <button className="w-12 h-8 md:w-16 md:h-12">
            <img src={likeImg} className="w-full h-full" />
          </button>
          <p className="my-2 font-semibold">{like}</p>
          <p className="text-sm md:text-sm">วันที่ : {date}</p>
        </div>
        <button className="flex items-center justify-center w-16 h-16 mr-4 bg-red-400 rounded-xl">
          <img src={trash} className="w-8 h-8"></img>
        </button>
      </div>
    </div>
  )
}
