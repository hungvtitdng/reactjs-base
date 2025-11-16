import { USER_ROLES_LEVELS } from '../config/constants'
import { deleteStorage, getAccessToken } from '../utils/helpers'

export const hasAuth = () => {
  return true

  // const accessToken = getAccessToken()

  // if (accessToken && accessToken.length > 40) {
  //   return true
  // }

  // deleteStorage()
  // return false
}

export const hasPer = (userRoles, allowRoles = null, isExact = false) => {
  return allowRoles === null ||
    isExact ?
    USER_ROLES_LEVELS[userRoles] === USER_ROLES_LEVELS[allowRoles] :
    USER_ROLES_LEVELS[userRoles] <= USER_ROLES_LEVELS[allowRoles]
}
