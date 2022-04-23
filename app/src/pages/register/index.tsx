import { ChangeEvent, useState } from 'react'
import axios from 'pages/apiclient'
import { useNavigate, Link } from 'react-router-dom'
import { Screen } from 'components/layouts/Screen'
import { Path } from 'routes'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const userLogin = {
    username: username,
    password: password,
  }

  const sendLogin = async () => {
    const response = await axios.post('https://thammathip.exitguy.studio/auth/Session/login', userLogin)
    window.localStorage.setItem('accessToken', response.data.accessToken)
    window.localStorage.setItem('refreshToken', response.data.refreshToken)
    window.localStorage.setItem('anoucement', 'FALSE')
    window.localStorage.setItem('auth', 'YES')
    console.log(response)
    return navigateTo(Path.Profile)
  }

  return (
    <Screen>
      
    </Screen>
  )
}

export default Register
