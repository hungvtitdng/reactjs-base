import { useSelector as useReduxSelector } from 'react-redux'
import { useMemo } from 'react'

/**
 * Base UseSelector Hook Factory
 * Tạo hook useSelector để sử dụng gọn trong components
 *
 * @param {string} moduleName - Module name (e.g., 'category')
 * @param {Object} initialState - Initial state object
 * @param {Array} allActions - All actions config array
 * @returns {Function} - Hook function trả về object chứa tất cả values
 *
 * @example
 * // Trong module useSelector.jsx
 * import { createUseSelector } from '../../base'
 * import categoryStore from './index'
 *
 * export default createUseSelector('category', categoryStore.initialState, categoryStore.allActions)
 *
 * // Sử dụng trong component
 * import useSelector from '../store/modules/category/useSelector'
 *
 * const Component = () => {
 *   const { loading, error, list } = useSelector()
 *   // ...
 * }
 */
export const createUseSelector = (moduleName, initialState, allActions = []) => {
  return function useModuleSelector() {
    // convert moduleName from kebab-case to camelCase
    const camelCaseModuleName = moduleName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    // Select state function
    const selectState = (state) => state[camelCaseModuleName] || initialState

    // Use a single selector to get the entire state to avoid variable number of hooks
    const state = useReduxSelector(selectState)

    // Extract all values from state
    return useMemo(() => ({
      loading: state.loading,
      submitting: state.submitting,
      error: state.error,
      list: state.list,
      detail: state.detail,
      getListSuccess: state.getListSuccess,
      getDetailSuccess: state.getDetailSuccess,
      createSuccess: state.createSuccess,
      updateSuccess: state.updateSuccess,
      deleteSuccess: state.deleteSuccess,
      actionSuccess: state.actionSuccess,
      // Include all other fields from state (user, accessToken, etc.)
      ...Object.keys(state).reduce((acc, key) => {
        const baseSelectorNames = ['loading', 'submitting', 'error', 'list', 'detail', 'getListSuccess', 'getDetailSuccess', 'createSuccess', 'updateSuccess', 'deleteSuccess', 'actionSuccess']
        if (!baseSelectorNames.includes(key)) {
          acc[key] = state[key]
        }
        return acc
      }, {}),
    }), [state])
  }
}

export default createUseSelector
