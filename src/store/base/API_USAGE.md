# Base API Usage

## Tự động tạo Base API

Base store tự động tạo API với CRUD operations từ `name`:

```javascript
const categoryStore = createBaseStore({
  name: 'category', // Tự động tạo: list, store, detail, update, destroy
})
```

## Tự động tạo API từ name

- `name: 'category'` → Path: `/categories`
- `name: 'user'` → Path: `/users`
- `name: 'product'` → Path: `/products`

## Các cách sử dụng API

### 1. Auto-generated Base API (Không cần khai báo gì)

```javascript
// src/store/modules/category/index.jsx
import { createBaseStore } from '../../base'

const categoryStore = createBaseStore({
  name: 'category',
  // Tự động tạo API với CRUD: list, store, detail, update, destroy
})
```

### 2. Load từ file src/api/{name}.jsx (Tự động)

```javascript
// src/api/category.jsx
import createBaseApi from './baseApi'

const categoryApi = createBaseApi('category', {
  // Custom methods nếu cần
  // export: (params) => httpRequest.get('/categories/export', { params }),
})

export default categoryApi
```

```javascript
// src/store/modules/category/index.jsx
import { createBaseStore } from '../../base'

const categoryStore = createBaseStore({
  name: 'category',
  // Tự động load từ src/api/category.jsx (nếu có)
  // Nếu không có file, sẽ tự động tạo base API
})
```

### 3. Extend Base API với custom methods trong file

```javascript
// src/api/business.jsx
import httpRequest from '../services/httpRequest'
import createBaseApi from './baseApi'

const businessApi = createBaseApi('business', {
  export: (params) => httpRequest.get('/businesses/export', { params }),
})

export default businessApi
```

```javascript
// src/store/modules/business/index.jsx
import { createBaseStore } from '../../base'

const businessStore = createBaseStore({
  name: 'business',
  // Tự động load từ src/api/business.jsx (có export method)
})
```

### 4. Custom API file name

```javascript
const categoryStore = createBaseStore({
  name: 'category',
  apiName: 'category-custom', // Load từ src/api/category-custom.jsx
})
```

### 5. Truyền API object trực tiếp

```javascript
import customApi from '../api/custom-api'

const categoryStore = createBaseStore({
  name: 'category',
  api: customApi, // Override auto-generated API
})
```

### 6. Extend Base API với customApiMethods

```javascript
// src/store/modules/category/index.jsx
import { createBaseStore } from '../../base'
import httpRequest from '../../../services/httpRequest'

const categoryStore = createBaseStore({
  name: 'category',
  customApiMethods: {
    export: (params) => httpRequest.get('/categories/export', { params }),
  },
})
```

## Base API Methods

Tất cả base API đều có các methods sau:

- `list(params)` - GET /{name}s
- `store(formData)` - POST /{name}s
- `detail(id, params)` - GET /{name}s/{id}
- `update(id, formData)` - PATCH /{name}s/{id}
- `destroy(id)` - DELETE /{name}s/{id}

## Ví dụ đầy đủ

### Business API với export method

```javascript
// src/api/business.jsx
import httpRequest from '../services/httpRequest'
import createBaseApi from './baseApi'

const businessApi = createBaseApi('business', {
  // Custom methods
  export: (params) => httpRequest.get('/businesses/export', { params }),
  duplicate: (id) => httpRequest.post(`/businesses/${id}/duplicate`),
})

export default businessApi

// Export named exports để dễ sử dụng
export const {
  list,
  store,
  detail,
  update,
  destroy,
  export: exportBusiness,
  duplicate,
} = businessApi
```

```javascript
// src/store/modules/business/index.jsx
import { createBaseStore } from '../../base'

const businessStore = createBaseStore({
  name: 'business',
  customActions: [
    {
      name: 'export',
      apiName: 'export',
      selector: 'export',
    },
    {
      name: 'duplicate',
      apiName: 'duplicate',
      selector: 'duplicatedItem',
    },
  ],
})
```

Sẽ có:
- Base CRUD: `list`, `store`, `detail`, `update`, `destroy`
- Custom: `export`, `duplicate`

