import { all, call, put, takeEvery } from 'redux-saga/effects'

/**
 * Base Saga Factory
 * Tạo các saga handlers cho CRUD operations
 */

const createBaseSaga = (constants, actions, api, allActions = [], tasks = []) => {
  /**
   * Dynamic Action Saga Generator
   * Tự động generate saga cho tất cả actions (base + tasks)
   */
  const sagas = []

  // Create a map of tasks by name for quick lookup
  const tasksMap = {}
  tasks.forEach((task) => {
    tasksMap[task.name] = task
  })

  allActions.forEach((actionConfig) => {
    const actionName = actionConfig.name
    const actionNameUpper = actionName.toUpperCase()
    const apiMethod = actionConfig.apiName || actionConfig.name

    // Get task config if exists
    const task = tasksMap[actionName]

    function* actionSaga(payload) {
      try {
        // Call before hook if exists
        if (task?.saga?.before) {
          yield* task.saga.before(payload, actions)
        }

        // Get API method from api object
        const apiFunction = api[apiMethod]

        if (!apiFunction) {
          throw new Error(`API method "${apiMethod}" not found`)
        }

        // Parse payload config to get API call parameters
        // If payload config is not defined, just call API without params
        let res
        if (actionConfig.payload !== undefined && actionConfig.payload !== null && actionConfig.payload !== '') {
          // Support both string ('id, params') and array (['id', 'params'])
          const payloadConfig = actionConfig.payload
          const paramNames = Array.isArray(payloadConfig)
            ? payloadConfig
            : payloadConfig.split(',').map((name) => name.trim())
          const apiParams = []

          paramNames.forEach((paramName) => {
            // Support aliases: formData/data, params
            let value
            if (paramName === 'formData' || paramName === 'data') {
              value = payload.formData || payload.data
            } else {
              value = payload[paramName]
            }

            // Only add to params if value is not undefined
            if (value !== undefined) {
              apiParams.push(value)
            }
          })

          // Call API with parsed parameters
          res = apiParams.length > 0
            ? yield call(apiFunction, ...apiParams)
            : yield call(apiFunction)
        } else {
          // No payload config, just call API without params
          res = yield call(apiFunction)
        }

        // Put success action
        const successData = res.data !== undefined ? res.data : res
        yield put(actions[`${actionName}SuccessAction`](successData))

        // Call after hook if exists
        if (task?.saga?.after) {
          yield* task.saga.after(successData, payload, actions)
        }
      } catch (error) {
        yield put(actions.handleErrorAction(error))
      }
    }

    sagas.push({
      constant: constants[`${actionNameUpper}_REQUEST`],
      saga: actionSaga,
    })
  })

  /**
   * Root Saga
   */
  function* rootSaga() {
    yield all(sagas.map(({ constant, saga }) => takeEvery(constant, saga)))
  }

  return rootSaga
}

export default createBaseSaga
