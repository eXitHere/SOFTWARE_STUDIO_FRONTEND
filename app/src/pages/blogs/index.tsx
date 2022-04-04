import { Screen } from 'components/layouts/Screen'
import Navbar from 'components/common/Navbar'
import Tag from 'components/common/Tag'
import BlogComponent from 'components/common/BlogComponent'
import profile1 from '../../assets/images/profile1.jpeg'
export const Blogs = () => {
  const dataset = [
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
  return (
    <Screen>
      <Navbar />
      <Tag />
      {dataset.map(data => {
        return  <BlogComponent key = {data.id} name = {data.name} photo = {data.photo} topic = {data.topic}  exText = {data.exText} like = {data.like} date = {data.date}/>
      })}
    </Screen>
  )
}

export default Blogs
