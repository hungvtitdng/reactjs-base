import { createUseSelector } from '../../base'
import authStore from './index'

/**
 * Auth UseSelector Hook
 * Sử dụng: import useSelector from '../store/modules/auth/useSelector'
 *
 * const { loading, error, user, accessToken } = useSelector()
 */
export default createUseSelector(authStore.name, authStore.initialState, authStore.allActions)
