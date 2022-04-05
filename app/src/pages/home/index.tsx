import BlogComponent from 'components/common/BlogComponent'
import { Screen } from 'components/layouts/Screen'
import profile1 from '../../assets/images/profile1.jpeg'
import { Link } from 'react-router-dom'
import Navbar from 'components/common/Navbar'
export const Home = () => {
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
      <Navbar isBoards={false} />
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <img src={profile1} className="mt-8 mb-2 rounded-full w-36 h-36"></img>
        <p className="p-2 text-3xl font-bold text-white">UserName</p>
        <p className="p-2 text-xl font-semibold text-white">กระทู้ : 1</p>
        <div>
          <Link to="/editProfile">
            <button className="h-16 m-4 font-semibold bg-primary-lightest rounded-xl w-36">แก้ไขบัญชีผู้ใช้</button>
          </Link>
          <Link to="/createBlog">
            <button className="h-16 m-4 font-semibold bg-primary-lightest rounded-xl w-36">ตั้งกระทู้ใหม่ +</button>
          </Link>
        </div>
      </div>
      {/* กระทู้ทั้งหมดของฉัน */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-4/5 mt-4 mb-4">
          <p className="text-xl text-white">กระทู้ทั้งหมดของฉัน</p>
        </div>
        {dataset.map((data) => {
          return (
            <BlogComponent
              key={data.id}
              name={data.name}
              photo={data.photo}
              topic={data.topic}
              exText={data.exText}
              like={data.like}
              date={data.date}
            />
          )
        })}
      </div>
    </Screen>
  )
}

export default Home
