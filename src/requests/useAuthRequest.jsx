import { createUseRequest } from './useBaseRequest'
import authStore from '../store/modules/auth'

/**
 * Auth Request Hook
 * Extend từ base với custom actions
 */
const useAuthRequest = createUseRequest('auth', authStore, {
  // syncRequest: (actions) => {
  //   actions.syncAction()
  // },
  loginRequest: (data, actions) => {
    actions.loginAction({ formData: data })
  },
})

export default useAuthRequest
