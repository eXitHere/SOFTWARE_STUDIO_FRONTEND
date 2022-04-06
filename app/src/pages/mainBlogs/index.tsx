import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { Tag } from 'components/common/Tag'
import { BlogCard } from 'components/common/BlogCard'
import { useState } from 'react'
import profile1 from 'assets/images/profile1.jpeg'
import searchIcon from 'assets/images/searchIcon.png'
import { Blog } from 'types'

// Mock data
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

export const MainBlogs = () => {
  const [search, setSearch] = useState('')
  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(search)
  }
  return (
    <Screen>
      <Navbar isBoards={true} />
      <form onSubmit={handleSearch} className="flex items-center justify-center w-5/6 h-10 mt-16 md:hidden">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 mx-2 rounded-md w-72"
        />
        <img onClick={handleSearch} src={searchIcon} className="w-8 h-8 mx-2" />
      </form>
      <Tag />
      {blogs.map(({ id, ...rest }) => {
        return <BlogCard key={id} {...rest} />
      })}
    </Screen>
  )
}

export default MainBlogs
