import { createUseSelector } from '../../base'
import branchStore from './index'

/**
 * Branch UseSelector Hook
 * Sử dụng: import useSelector from '../store/modules/branch/useSelector'
 *
 * const { loading, error, list, listWithPermission } = useSelector()
 */
export default createUseSelector(branchStore.name, branchStore.initialState, branchStore.allActions)
