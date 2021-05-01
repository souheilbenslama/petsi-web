import axios from 'axios'
import store from '../../store'

const apiAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  'Content-Type': 'application/json',
})

apiAxios.interceptors.request.use((request) => {
  const accessToken = store.getters.token
  if (accessToken) {
    request.headers.authorization = accessToken
  }
  return request
}, error => {
  return Promise.reject(error)
})


export default apiAxios