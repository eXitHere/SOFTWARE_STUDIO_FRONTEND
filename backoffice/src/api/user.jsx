import axios from './apiClient'
import { URL } from './constance'

async function login(username, password) {
  try {
    const result = await axios(`${URL}/auth/Session/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    localStorage.setItem('token', result.data.accessToken)
    localStorage.setItem('refreshToken', result.data.refreshToken)

    return true
  } catch (error) {
    console.log(error)
    return null
  }
}

async function listUser() {
  try {
    const result = await axios(`${URL}/api/Admin/manage/user/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    })

    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getUser(uuid) {
  try {
    const result = await axios(`${URL}/api/Admin/manage/user/get/${uuid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // console.log(result.data);

    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function updateUser(uuid, body) {
  try {
    const result = await axios(`${URL}/api/Admin/manage/user/update/${uuid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    })

    // console.log(result.data);

    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { login, listUser, getUser, updateUser }
