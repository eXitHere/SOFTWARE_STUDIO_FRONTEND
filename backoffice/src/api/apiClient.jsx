import axios from 'axios'

const buildAuthHeader = (config) => {
  return {
    ...config.headers,
    authorization: `Bearer ${localStorage.getItem('token')}`,
    SameSite: 'Strict',
  }
}

axios.interceptors.request.use(
  function (config) {
    const nHeader = buildAuthHeader(config)
    config = {
      ...config,
      url: config.url,
      headers: {
        ...nHeader,
      },
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.reload()
      return
    }
    return Promise.reject(error)
  },
)

axios.defaults.withCredentials = true
const api = axios

export default api
