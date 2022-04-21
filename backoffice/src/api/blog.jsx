import axios from './apiClient'
import { URL } from './constance'

async function listBlog() {
  try {
    const result = await axios(`${URL}/api/Admin/manage/blog/list`, {
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

async function toggleHiddenBlog(id) {
  try {
    const result = await axios(`${URL}/api/Admin/manage/blog/hide/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function deleteBlog(id) {
  try {
    const result = await axios(`${URL}/api/Admin/manage/blog/delete/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { listBlog, toggleHiddenBlog, deleteBlog }
