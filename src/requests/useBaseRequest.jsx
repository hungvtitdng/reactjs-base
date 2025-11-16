import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useInjectReducer } from '../store/injectReducer'
import { useInjectSaga } from '../store/injectSaga'

/**
 * Base Request Hook Factory
 * Tự động tạo CRUD request hooks cho module
 *
 * @param {string} name - Module name (e.g., 'category')
 * @param {Object} store - Store object từ createBaseStore
 * @param {Object} customMethods - Custom request methods (optional)
 * @returns {Function} - Hook function
 *
 * @example
 * // Base CRUD only - tự động có:
 * // getListCategoryRequest, getDetailCategoryRequest, createCategoryRequest,
 * // updateCategoryRequest, deleteCategoryRequest
 * const useCategoryRequest = createUseRequest('category', categoryStore)
 *
 * // With custom methods - có thể override hoặc thêm mới
 * const useCategoryRequest = createUseRequest('category', categoryStore, {
 *   // Override base method
 *   getListCategoryRequest: (params, actions) => {
 *     // Custom logic
 *     actions.getListAction({ params })
 *   },
 *
 *   // Add custom method
 *   exportCategoryRequest: (params, actions) => {
 *     actions.exportAction({ params })
 *   },
 * })
 */
export const createUseRequest = (name, store, customMethods = {}) => {
  return function useModuleRequest() {
    const key = name

    // Inject reducer and saga
    useInjectReducer({ key, reducer: store.reducer })
    useInjectSaga({ key, saga: store.saga })

    const dispatch = useDispatch()
    const actions = bindActionCreators(store.actions, dispatch)

    // Capitalize first letter for method names
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)

    // Base CRUD request methods
    const baseMethods = {
      [`getList${nameCapitalized}Request`]: (params) => {
        actions.getListAction({ params })
      },
      [`getDetail${nameCapitalized}Request`]: (id, params) => {
        actions.getDetailAction({ id, params })
      },
      [`create${nameCapitalized}Request`]: (data) => {
        actions.createAction({ formData: data })
      },
      [`update${nameCapitalized}Request`]: (id, data) => {
        actions.updateAction({ id, formData: data })
      },
      [`delete${nameCapitalized}Request`]: (id) => {
        actions.deleteAction({ id })
      },
    }

    // Generate methods for custom actions
    const customActionMethods = {}
    if (store.allActions) {
      store.allActions.forEach((actionConfig) => {
        const actionName = actionConfig.name
        const actionMethodName = `${actionName}Action`
        // Method name: getListWithPermission -> getListWithPermissionBranchRequest
        const requestMethodName = `${actionName}${nameCapitalized}Request`

        // Skip base actions (already handled above)
        const baseActionNames = ['getList', 'create', 'getDetail', 'update', 'delete']
        if (!baseActionNames.includes(actionName)) {
          customActionMethods[requestMethodName] = (payload) => {
            // Support both object and individual params
            if (typeof payload === 'object' && payload !== null && !payload.type) {
              actions[actionMethodName](payload)
            } else {
              // If payload is not object, treat as params
              actions[actionMethodName]({ params: payload })
            }
          }
        }
      })
    }

    // Bind custom methods với actions và dispatch
    const boundCustomMethods = {}
    Object.keys(customMethods).forEach((methodName) => {
      const customMethod = customMethods[methodName]
      if (typeof customMethod === 'function') {
        // Custom method được gọi với (...args, actions, dispatch)
        // User có thể viết: (params, actions) => actions.exportAction({ params })
        boundCustomMethods[methodName] = (...args) => {
          return customMethod(...args, actions, dispatch)
        }
      } else {
        boundCustomMethods[methodName] = customMethod
      }
    })

    // Merge base methods, custom action methods, và custom methods (custom có priority để override)
    return {
      ...baseMethods,
      ...customActionMethods,
      ...boundCustomMethods,
    }
  }
}

export default createUseRequest
