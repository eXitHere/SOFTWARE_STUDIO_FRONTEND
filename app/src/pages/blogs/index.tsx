import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { Tag } from 'components/common/Tag'
import { BlogSection } from 'components/common/BlogSection'
import profile1 from 'assets/images/profile1.jpeg'
import { Blog } from 'types'

const blogs: Blog[] = [
  {
    id: '001',
    name: 'User101',
    photo: profile1,
    topic: 'Header 1',
    exText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 100,
    date: '10/12/22',
  },
  {
    id: '002',
    name: 'User102',
    photo: profile1,
    topic: 'Header 2',
    exText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 70,
    date: '5/1/22',
  },
  {
    id: '003',
    name: 'User103',
    photo: profile1,
    topic: 'Header 3',
    exText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 75,
    date: '10/12/22',
  },
  {
    id: '004',
    name: 'User104',
    photo: profile1,
    topic: 'Header 4',
    exText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus erat maximus, fringilla ipsum quis, vestibulum tellus. Vivamus non ultrices elit, at tristique lorem. Fusce non massa eget sapien mattis efficitur a a neque.',
    like: 10,
    date: '10/12/22',
  },
]

export const Blogs = () => {
  return (
    <Screen>
      <Navbar />
      <Tag />
      {blogs.map((data) => {
        return <BlogSection key={data.id} {...data} />
      })}
    </Screen>
  )
}

export default Blogs
