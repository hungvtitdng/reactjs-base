import httpRequest from '../services/httpRequest'
import createBaseApi from './base'

const path = 'branches'

const branchApi = createBaseApi(path, {
  listWithPermission: (params) => httpRequest.get(`/${path}/with-permission`, { params }),
})

export default branchApi
