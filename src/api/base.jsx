import httpRequest from '../services/httpRequest'

/**
 * Base API Factory
 * Tạo API functions cho CRUD operations và custom methods
 *
 * @param {string} endpoint - API endpoint path (e.g., '/categories' or 'categories')
 * @param {Object} customMethods - Custom API methods (optional)
 * @returns {Object} - API object với CRUD methods + custom methods
 *
 * @example
 * // Base CRUD only
 * const categoryApi = createBaseApi('/categories')
 *
 * // With custom methods
 * const categoryApi = createBaseApi('/categories', {
 *   export: (params) => httpRequest.get('/categories/export', { params }),
 *   import: (formData) => httpRequest.post('/categories/import', formData),
 * })
 */
const createBaseApi = (endpoint = null, customMethods = {}) => {
  // Nếu không có endpoint, chỉ trả về customMethods
  if (!endpoint) {
    return customMethods
  }

  // Đảm bảo endpoint có dấu / ở đầu
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  // Base CRUD methods
  const baseApi = {
    list: (params) => httpRequest.get(path, { params }),
    store: (formData) => httpRequest.post(path, formData),
    detail: (id, params) => httpRequest.get(`${path}/${id}`, { params }),
    update: (id, formData) => httpRequest.patch(`${path}/${id}`, formData),
    destroy: (id) => httpRequest.delete(`${path}/${id}`),
  }

  // Merge với custom methods
  return {
    ...baseApi,
    ...customMethods,
  }
}

export default createBaseApi
