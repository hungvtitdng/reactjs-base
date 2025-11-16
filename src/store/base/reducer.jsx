import produce from 'immer'
import lodash from 'lodash'

/**
 * Base Reducer Factory
 * Tạo reducer với state và logic xử lý CRUD cơ bản
 */

export const createInitialState = () => ({
  loading: false,
  submitting: false,
  error: null,
  list: null,
  detail: null,
  getListSuccess: null,
  getDetailSuccess: null,
  createSuccess: null,
  updateSuccess: null,
  deleteSuccess: null,
  actionSuccess: null,
})

const createBaseReducer = (constants, initialStateOverride = {}, allActions = [], tasks = []) => {
  const initialState = {
    ...createInitialState(),
    ...initialStateOverride,
  }

  // Add action state vào initialState
  allActions.forEach((actionConfig) => {
    const selectorName = actionConfig.selector || actionConfig.name
    const successSelector = actionConfig.successSelector || `${selectorName || actionConfig.name}Success`

    if (selectorName) {
      initialState[selectorName] = null
    }
    initialState[successSelector] = null
  })

  // Create a map of tasks by name for quick lookup
  const tasksMap = {}
  tasks.forEach((task) => {
    tasksMap[task.name] = task
  })

  const baseReducer = (state, action) =>
    produce(state || initialState, (draft) => {
      switch (action.type) {
        case constants.SET_DATA:
          lodash.forEach(action.params, (value, key) => {
            draft[key] = value
          })
          break

        case constants.HANDLE_ERROR:
          draft.error = action.error
          draft.loading = false
          draft.submitting = false
          // Reset all success flags
          allActions.forEach((actionConfig) => {
            const successSelector = actionConfig.successSelector || `${(actionConfig.selector || actionConfig.name)}Success`
            draft[successSelector] = false
          })
          draft.actionSuccess = false
          break

        default: {
          // Handle all actions dynamically
          const actionConfig = allActions.find((config) => {
            const actionNameUpper = config.name.toUpperCase()
            return action.type === constants[`${actionNameUpper}_REQUEST`]
              || action.type === constants[`${actionNameUpper}_SUCCESS`]
          })

          if (actionConfig) {
            const actionNameUpper = actionConfig.name.toUpperCase()
            const selectorName = actionConfig.selector || actionConfig.name
            const successSelector = actionConfig.successSelector || `${selectorName || actionConfig.name}Success`
            const loadingType = actionConfig.loadingType || 'loading'

            if (action.type === constants[`${actionNameUpper}_REQUEST`]) {
              draft[loadingType] = true
              draft.error = false
              // Chỉ reset actionSuccess khi có create, update, hoặc delete request
              if (['create', 'update', 'delete'].includes(actionConfig.name)) {
                draft.actionSuccess = null
              }
              if (selectorName) {
                draft[selectorName] = null
              }
              draft[successSelector] = null
            }

            if (action.type === constants[`${actionNameUpper}_SUCCESS`]) {
              draft[loadingType] = false
              draft[successSelector] = true

              if (['create', 'update', 'delete'].includes(actionConfig.name)) {
                draft.actionSuccess = true
              }

              // Update selector data if exists
              if (selectorName) {
                draft[selectorName] = action.data
              }

              // Call custom reducer from task if exists (only after success)
              const task = tasksMap[actionConfig.name]
              if (task?.reducer && typeof task.reducer === 'function') {
                task.reducer(draft, action)
              }
            }
          } else {
            return state
          }
          break
        }
      }
    })

  return baseReducer
}

export default createBaseReducer
