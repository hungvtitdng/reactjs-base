import { createBaseStore } from '../base'

/**
 * Branch Store using Base Store Pattern
 * Auto-load API from src/api/branch.jsx
 * Custom action: getListWithPermission
 */
const branchStore = createBaseStore({
  name: 'branch',
  tasks: [
    {
      name: 'getListWithPermission',
      apiName: 'listWithPermission',
      selector: 'listWithPermission',
    },
  ],
})

export default branchStore
