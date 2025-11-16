import axios from 'axios'
import { REQUEST_HEADER } from '../config/constants'
import { getAccessToken, notifySucess } from '../utils/helpers'
import { checkSubPaths, errorException } from './handler'
import { getShortChar } from '../i18n'

const ignorePaths = [
  '/logout',
  '/login',
  '/tfa',
  '/register',
  '/forgot-password',
  '/invites/accept',
  '/invites',
  '/lesson-estimates',
]

const ignoreSubPaths = ['/reset-password/', '/invites/verify/', '/teacher-kid-cancellations/']

const httpRequest = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: REQUEST_HEADER,
})

httpRequest.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Localization = getShortChar()
    }

    return config
  },
  (error) => Promise.reject(error),
)

httpRequest.interceptors.response.use(
  (response) => {
    if (!ignorePaths.includes(response.config.url) && !checkSubPaths(response.config.url, ignoreSubPaths)) {
      switch (response.config.method) {
        case 'put':
        case 'patch':
          notifySucess('Cập nhật thành công')
          break

        case 'post':
          notifySucess('Lưu thành công')
          break

        case 'delete':
          notifySucess('Xóa thành công')
          break
      }
    }

    return response.data
  },
  (error) => errorException(error),
)

export default httpRequest
