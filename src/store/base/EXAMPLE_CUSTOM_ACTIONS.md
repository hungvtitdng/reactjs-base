# Custom Actions Example

## Cách khai báo custom action đơn giản

Chỉ cần khai báo trong `customActions` array, hệ thống sẽ tự động tạo:
- ✅ Constants (EXPORT_REQUEST, EXPORT_SUCCESS)
- ✅ Actions (exportAction, exportSuccessAction)
- ✅ Reducer cases (xử lý REQUEST và SUCCESS)
- ✅ Saga (gọi API và xử lý response)
- ✅ Selectors (export, exportSuccess)

## Ví dụ: Thêm action "export"

### 1. API file (`src/api/category.jsx`)

```javascript
export const export = (params) => httpRequest.get('/categories/export', { params })
```

### 2. Store config (`src/store/modules/category/index.jsx`)

```javascript
import { createBaseStore } from '../../base'
import * as categoryApi from '../../../api/category'

const categoryStore = createBaseStore({
  name: 'category',
  api: categoryApi,
  customActions: [
    {
      name: 'export',        // Tên action → tự động tạo exportAction
      apiName: 'export',      // Tên method trong API (optional, mặc định = name)
      selector: 'export',     // Tên selector trong state (optional, mặc định = name)
      loadingType: 'loading', // Optional, mặc định = 'loading'
      successSelector: 'exportSuccess', // Optional, mặc định = '${name}Success'
    },
  ],
})

export default categoryStore
```

### 3. Sử dụng trong component

```javascript
import { useDispatch } from 'react-redux'
import useSelector from '../store/modules/category/useSelector'
import categoryStore from '../store/modules/category'

const CategoryPage = () => {
  const dispatch = useDispatch()
  const { loading, list, export: exportData, exportSuccess } = useSelector()

  const handleExport = () => {
    dispatch(categoryStore.actions.exportAction({ format: 'excel' }))
  }

  useEffect(() => {
    if (exportSuccess) {
      // Xử lý sau khi export thành công
      console.log('Export data:', exportData)
    }
  }, [exportSuccess, exportData])

  return (
    <button onClick={handleExport}>
      {loading ? 'Exporting...' : 'Export'}
    </button>
  )
}
```

## Tự động tạo gì?

### Constants
```javascript
EXPORT_REQUEST: 'category/EXPORT_REQUEST'
EXPORT_SUCCESS: 'category/EXPORT_SUCCESS'
```

### Actions
```javascript
// Tự động generate từ name: 'export' → exportAction
exportAction(payload = {}) {
  // payload có thể là { id, params, formData }
  return {
    type: 'category/EXPORT_REQUEST',
    id: payload.id,
    params: payload.params,
    formData: payload.formData || payload.data,
  }
}

// Tự động generate: exportSuccessAction
exportSuccessAction(data) {
  return {
    type: 'category/EXPORT_SUCCESS',
    data,
  }
}
```

### Reducer State
```javascript
{
  export: null,
  exportSuccess: null,
}
```

### Saga
```javascript
function* exportSaga(payload) {
  try {
    const res = yield call(api.export, payload.params)
    yield put(actions.exportSuccessAction(res.data))
  } catch (error) {
    yield put(actions.handleErrorAction(error))
  }
}
```

### Selectors
```javascript
export: () => createSelector(...)  // Selector cho data
exportSuccess: () => createSelector(...)  // Selector cho success flag
```

## Ví dụ với callback

```javascript
const categoryStore = createBaseStore({
  name: 'category',
  api: categoryApi,
  customActions: [
    {
      name: 'export',
      apiName: 'export',
    },
  ],
  sagaOptions: {
    onExportSuccess: function* (data, payload) {
      // Custom logic sau khi export thành công
      yield put(history.push('/exports'))
    },
  },
})
```

## Ví dụ với nhiều custom actions

```javascript
const categoryStore = createBaseStore({
  name: 'category',
  api: categoryApi,
  customActions: [
    {
      name: 'export',        // → exportAction
      apiName: 'export',
      selector: 'export',     // → export, exportSuccess
    },
    {
      name: 'import',         // → importAction
      apiName: 'import',
      selector: 'import',     // → import, importSuccess
    },
    {
      name: 'duplicate',      // → duplicateAction
      apiName: 'duplicate',
      selector: 'duplicatedItem', // → duplicatedItem, duplicatedItemSuccess
    },
  ],
})
```

Sẽ tự động có:
- `exportAction({ params })`, `exportSuccessAction(data)`, `export`, `exportSuccess`
- `importAction({ formData })`, `importSuccessAction(data)`, `import`, `importSuccess`
- `duplicateAction({ id })`, `duplicateSuccessAction(data)`, `duplicatedItem`, `duplicatedItemSuccess`

