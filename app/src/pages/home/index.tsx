import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from 'contexts/store'
import { Screen } from 'components/layouts/Screen'
import { Path } from 'routes'
import profile1 from 'assets/images/profile1.jpeg'

export const Home = () => {
  const userContext = useContext(UserContext)
  const login = () => {
    if (userContext) {
      userContext.setUser({
        id: '1',
        token: 'abcdefg',
        displayname: 'Soon-404',
        username: 'Thanakorn',
        password: '1234',
        photo: profile1,
      })
    }
  }

  return (
    <Screen>
      <Link to={Path.Profile}>
        <button onClick={login}>login</button>
      </Link>
    </Screen>
  )
}

export default Home
