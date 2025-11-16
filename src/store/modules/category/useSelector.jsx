import { createUseSelector } from '../../base'
import categoryStore from './index'

/**
 * Category UseSelector Hook
 * Sử dụng: import useSelector from '../store/modules/category/useSelector'
 *
 * const { loading, error, list } = useSelector()
 */
export default createUseSelector(categoryStore.name, categoryStore.initialState, categoryStore.allActions)
