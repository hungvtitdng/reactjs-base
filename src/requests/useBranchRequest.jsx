import { createUseRequest } from './useBaseRequest'
import branchStore from '../store/modules/branch'

/**
 * Branch Request Hook
 * Extend từ base với CRUD operations tự động
 * Custom method: getListWithPermissionBranchRequest
 */
const useBranchRequest = createUseRequest('branch', branchStore, {
  getListWithPermissionBranchRequest: (params, actions) => {
    actions.getListWithPermissionAction({ params })
  },
})

export default useBranchRequest
