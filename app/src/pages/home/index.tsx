import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from 'contexts/store'
import { Screen } from 'components/layouts/Screen'
import { Path } from 'routes'
import profile1 from 'assets/images/profile1.jpeg'
import MockLogin from 'pages/mocklogin'
import MainBlogs from 'pages/mainBlogs'

export const Home = () => {
  return (
    <Screen>
      {/* <Link to={Path.Profile}>
        <button onClick={login}>login</button>
      </Link> */}
      {/* <Login/> */}
      <MainBlogs />
    </Screen>
  )
}

export default Home
