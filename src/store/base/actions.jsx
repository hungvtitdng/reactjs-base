/**
 * Base Actions Factory
 * Tạo các action creators cho module
 * Tự động generate từ actions config
 */

const createBaseActions = (constants, allActions = []) => {
  const actions = {
    handleErrorAction(error) {
      return {
        type: constants.HANDLE_ERROR,
        error,
      }
    },
    setDataAction(params) {
      return {
        type: constants.SET_DATA,
        params,
      }
    },
  }

  // Generate actions cho tất cả actions (base + custom)
  allActions.forEach((actionConfig) => {
    const actionName = actionConfig.name
    const actionNameUpper = actionName.toUpperCase()

    // Action creator: tự động generate từ name
    // name: 'getList' → getListAction
    // name: 'export' → exportAction
    const actionMethodName = `${actionName}Action`

    actions[actionMethodName] = (payload = {}) => {
      // Hỗ trợ cả object và individual params để backward compatible
      let id
      let params
      let formData

      if (typeof payload === 'object' && payload !== null && !payload.type) {
        // Payload là object { id, params, formData }
        id = payload.id
        params = payload.params
        formData = payload.formData || payload.data
      } else {
        // Backward compatible: individual params
        // Nếu payload không phải object, coi như là params/data
        params = payload
        formData = payload
      }

      return {
        type: constants[`${actionNameUpper}_REQUEST`],
        id,
        params,
        formData,
        data: formData, // Alias cho backward compatible
      }
    }

    // Success action creator: getListSuccessAction, createSuccessAction, etc.
    actions[`${actionName}SuccessAction`] = (data) => {
      return {
        type: constants[`${actionNameUpper}_SUCCESS`],
        data,
      }
    }
  })

  return actions
}

export default createBaseActions
