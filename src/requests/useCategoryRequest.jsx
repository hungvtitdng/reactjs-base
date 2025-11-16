import { createUseRequest } from './useBaseRequest'
import categoryStore from '../store/modules/category'

/**
 * Category Request Hook
 * Extend từ base với CRUD operations tự động
 * Có thể override hoặc thêm custom methods nếu cần
 */
const useCategoryRequest = createUseRequest('category', categoryStore)

export default useCategoryRequest
