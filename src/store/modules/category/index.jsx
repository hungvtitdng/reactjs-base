import { createBaseStore } from '../../base'

/**
 * Category Store using Base Store Pattern
 * Auto-load API from src/api/category.jsx
 */
const categoryStore = createBaseStore({
  name: 'category',
  endpoint: 'categories',
})

export default categoryStore
