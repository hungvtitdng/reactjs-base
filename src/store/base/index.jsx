import createBaseConstants from './constants'
import createBaseActions from './actions'
import createBaseReducer, { createInitialState } from './reducer'
import createBaseSaga from './saga'
import createBaseApi from '../../api/base'

// Export factories
export { createUseSelector } from './useSelector'

/**
 * Base Store Factory
 *
 * @param {Object} config - Configuration object
 * @param {string} config.name - Module name (e.g., 'category', 'product')
 * @param {string} config.endpoint - API endpoint path (e.g., '/categories' or 'categories')
 * @param {string|Object} config.api - API file name (string) or API object (optional, auto-load from src/api/{name}.jsx)
 * @param {Object} config.customApiMethods - Custom API methods to extend base API (optional)
 * @param {Object} config.overrides - Override/extend base functionality
 * @param {Object} config.overrides.actions - Additional or replacement actions
 * @param {Function} config.overrides.reducer - Custom reducer function
 * @param {Function} config.overrides.saga - Custom saga function
 * @param {Object} config.overrides.initialState - Initial state override
 * @param {Object} config.sagaOptions - Saga options (listParams, detailParams, callbacks)
 *
 * @returns {Object} - Complete store module { constants, actions, reducer, saga, initialState, name, allActions }
 *
 * @example
 * // Auto-load API from src/api/category.jsx, nếu không có thì dùng src/api/base.jsx
 * const categoryStore = createBaseStore({
 *   name: 'category',
 *   endpoint: '/categories',
 * })
 *
 * // With custom API file name
 * const categoryStore = createBaseStore({
 *   name: 'category',
 *   endpoint: '/categories',
 *   api: 'custom-api', // Load từ src/api/custom-api.jsx
 * })
 *
 * // With custom API object
 * const categoryStore = createBaseStore({
 *   name: 'category',
 *   endpoint: '/categories',
 *   api: customApiObject,
 * })
 */
// Pre-load all API modules using import.meta.glob
const apiModules = import.meta.glob('../../api/*.jsx', { eager: true })

/**
 * Helper function to get API module by name
 * @param {string} apiName - API file name (without .jsx)
 * @returns {Object|null} - API module or null if not found
 */
const getApiModule = (apiName) => {
  const apiPath = `../../api/${apiName}.jsx`
  const module = apiModules[apiPath]
  if (module) {
    return module.default || module
  }
  return null
}

// Base CRUD actions config
const BASE_ACTIONS_CONFIG = [
  {
    name: 'getList',
    apiName: 'list',
    payload: ['params'],
    selector: 'list',
    loadingType: 'loading',
    successSelector: 'getListSuccess',
  },
  {
    name: 'create',
    apiName: 'store',
    payload: ['formData'],
    selector: null,
    loadingType: 'submitting',
    successSelector: 'createSuccess',
  },
  {
    name: 'getDetail',
    apiName: 'detail',
    payload: ['id', 'params'],
    selector: 'detail',
    loadingType: 'loading',
    successSelector: 'getDetailSuccess',
  },
  {
    name: 'update',
    apiName: 'update',
    payload: ['id', 'formData'],
    selector: 'detail',
    loadingType: 'submitting',
    successSelector: 'updateSuccess',
  },
  {
    name: 'delete',
    apiName: 'destroy',
    payload: ['id'],
    selector: null,
    loadingType: 'loading',
    successSelector: 'deleteSuccess',
  },
]

export const createBaseStore = (config) => {
  const {
    name,
    endpoint,
    api: providedApi,
    customApiMethods = {},
    baseActions: providedBaseActions,
    tasks = [],
    overrides = {},
  } = config

  if (!name) {
    throw new Error('createBaseStore requires "name" parameter')
  }

  // Auto-load API
  let api = null
  let hasApiFile = false

  // Nếu api là string (tên file), load từ src/api/{api}.jsx
  if (typeof providedApi === 'string') {
    const apiModule = getApiModule(providedApi)
    if (apiModule) {
      api = apiModule
      hasApiFile = true
    } else {
      throw new Error(`API file src/api/${providedApi}.jsx not found`)
    }
  } else if (providedApi && typeof providedApi === 'object') {
    // Nếu api là object, sử dụng trực tiếp
    api = providedApi
    hasApiFile = true // Coi như có API file
  } else {
    // Nếu không có api, thử load từ src/api/{name}.jsx
    const apiModule = getApiModule(name)
    if (apiModule) {
      // Nếu có file api/{name}.jsx thì không cần endpoint
      api = apiModule
      hasApiFile = true
    } else if (endpoint) {
      // Nếu không có file api/{name}.jsx nhưng có endpoint, dùng base.jsx để tạo base API
      api = createBaseApi(endpoint, customApiMethods)
    } else {
      // Nếu không có file và không có endpoint, tạo empty API object
      // Tasks sẽ tự định nghĩa API methods của chúng
      api = {}
    }
  }

  // Nếu không có endpoint, không dùng baseActions
  // Nếu có baseActions được cung cấp, dùng nó (có thể là filtered version)
  // Nếu không có baseActions và (có endpoint hoặc có API file), dùng BASE_ACTIONS_CONFIG
  // (vì API file có thể có base CRUD methods)
  const baseActions = providedBaseActions !== undefined
    ? providedBaseActions
    : (endpoint || hasApiFile ? BASE_ACTIONS_CONFIG : [])

  // Merge customApiMethods nếu có
  if (customApiMethods && Object.keys(customApiMethods).length > 0) {
    api = {
      ...api,
      ...customApiMethods,
    }
  }

  // Merge all actions (base + tasks)
  // Convert tasks to action config format for backward compatibility
  const tasksAsActions = tasks.map((task) => {
    // Selector logic: nếu selector là null thì không có selector, nếu undefined thì lấy theo name
    const selectorName = task.selector !== undefined
      ? (task.selector !== null ? task.selector : null)
      : task.name
    const successSelector = task.successSelector || `${selectorName || task.name}Success`

    // Nếu task có endpoint riêng, dùng nó thay vì apiName
    // endpoint trong task có thể là tên API method hoặc endpoint path
    const apiMethod = task.endpoint || task.apiName || task.name

    return {
      name: task.name,
      apiName: apiMethod,
      payload: task.payload !== undefined ? task.payload : null,
      selector: selectorName,
      loadingType: task.loadingType || 'loading',
      successSelector,
      saga: task.saga,
      reducer: task.reducer,
    }
  })
  const allActions = [...baseActions, ...tasksAsActions]

  // Validate API functions
  allActions.forEach((actionConfig) => {
    if (!actionConfig.name) {
      throw new Error('Action requires "name" property')
    }
  })

  // 1. Create Constants
  const constants = createBaseConstants(name, allActions)

  // 2. Create Actions
  const generatedActions = createBaseActions(constants, allActions)
  const actions = {
    ...generatedActions,
    ...(overrides.actions || {}),
  }

  // 3. Create Initial State
  const baseInitialState = createInitialState()
  // Add task selectors to initial state
  const taskInitialState = {}
  tasks.forEach((task) => {
    // Selector logic: nếu selector là null thì không có selector, nếu undefined thì lấy theo name
    const selectorName = task.selector !== undefined
      ? (task.selector !== null ? task.selector : null)
      : task.name
    const successSelector = task.successSelector || `${selectorName || task.name}Success`

    // Chỉ add selector vào state nếu selectorName không null
    if (selectorName !== null) {
      taskInitialState[selectorName] = null
    }
    taskInitialState[successSelector] = null
  })
  const initialState = {
    ...baseInitialState,
    ...taskInitialState,
    ...(overrides.initialState || {}),
  }

  // 4. Create Reducer
  const baseReducer = createBaseReducer(constants, overrides.initialState, allActions, tasks)
  const reducer = overrides.reducer
    ? (state, action) => {
      // Run custom reducer first, then base reducer if needed
      const customResult = overrides.reducer(state, action)
      // If custom reducer returns state (not undefined), use it
      // Otherwise fall back to base reducer
      return customResult !== undefined ? customResult : baseReducer(state, action)
    } : baseReducer

  // 5. Create Saga
  const baseSaga = createBaseSaga(constants, actions, api, allActions, tasks)
  const saga = typeof overrides.saga === 'function' && overrides.saga.length > 0
    ? overrides.saga(constants, actions, api)
    : (overrides.saga || baseSaga)

  return {
    constants,
    actions,
    reducer,
    saga,
    initialState,
    name,
    allActions, // Export allActions để useSelector có thể dùng
    tasks, // Export tasks để có thể truy cập
  }
}

export default createBaseStore
