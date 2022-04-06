import { Screen } from 'components/layouts/Screen'
import { Story } from 'components/common/Story'
import { PostComment } from 'components/common/PostComment'
import { CommentCard } from 'components/common/CommentCard'
import { Navbar } from 'components/common/Navbar'

import profile1 from 'assets/images/profile1.jpeg'

import { Comment } from 'types'

const Comments: Comment[] = [
  {
    id: '001',
    name: 'User101',
    photo: profile1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 100,
    date: '10/12/22',
  },
  {
    id: '002',
    name: 'User102',
    photo: profile1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 24,
    date: '9/4/22',
  },
]

const Blog = () => {
  return (
    <Screen>
      <Navbar isBoards={false} />
      <Story />
      <div className="flex flex-col w-4/5 mt-4 mb-4">
        <p className="text-xl font-semibold text-white">เพิ่มความเห็น</p>
      </div>
      <PostComment />
      <div className="flex flex-col w-4/5 mt-4 mb-4">
        <p className="text-xl font-semibold text-white">ความเห็นทั้งหมด</p>
      </div>
      {Comments.map(({ id, ...rest }) => {
        return <CommentCard key={id} {...rest} />
      })}
    </Screen>
  )
}

export default Blog
