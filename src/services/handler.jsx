import lodash from 'lodash'
import { logout, notifyError } from '../utils/helpers'

const ignorePaths = []
const ignoreSubPaths = ['/invites/verify/']

const showNotificaion = (errors) => {
  if (lodash.isString(errors)) {
    notifyError(errors)
  }

  lodash.forOwn(errors, (e) => {
    e.forEach((message) => {
      notifyError(message)
    })
  })
}

const handleError = (error) => {
  if (error) {
    if (error.errors) {
      showNotificaion(error.errors)
    } else {
      showNotificaion(error.message)
    }
  } else {
    notifyError('Hết thời gian yêu cầu!')
  }
}

export const errorException = (error) => {
  const statusCode = error.response?.status

  switch (statusCode) {
    case 401:
      logout()
      break

    case 403:
      notifyError('403 Forbidden')
      break

    case 404:
      if (!ignorePaths.includes(error.response.config.url) && !checkSubPaths(error.response.config.url, ignoreSubPaths)) {
        notifyError('404 Not Found')
      }

      break

    case 422:
      handleError(error.response?.data)
      break

    case 500:
      notifyError('500 Internal Server Error')
      break

    default:
      notifyError(`${statusCode} ${error.response?.data?.message}`)
      break
  }

  return Promise.reject(error.response?.data)
}

export const checkSubPaths = (url, subPaths) => {
  let hasSubPath = false

  subPaths.forEach((sp) => {
    if (url.indexOf(sp) === 0) {
      hasSubPath = true
      return false
    }
  })

  return hasSubPath
}
