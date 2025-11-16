# Base Store Pattern

Hệ thống Redux Store có thể tái sử dụng cho các module CRUD.

## 📁 Cấu trúc

```
src/store/
├── base/
│   ├── constants.jsx    # Factory tạo constants
│   ├── actions.jsx      # Factory tạo actions
│   ├── reducer.jsx      # Factory tạo reducer
│   ├── saga.jsx         # Factory tạo saga
│   ├── selectors.jsx    # Factory tạo selectors
│   ├── index.jsx        # Main factory: createBaseStore
│   └── README.md        # Documentation
└── modules/
    └── category/        # Example: Category module sử dụng base store
```

## 🚀 Cách sử dụng

### 1. Tạo Module mới với Base Store

```javascript
// src/store/modules/product/index.jsx
import { createBaseStore } from '../../base'
import * as productApi from '../../../api/product'
import history from '../../../utils/history'
import { put } from 'redux-saga/effects'

const productStore = createBaseStore({
  name: 'product',
  api: productApi,
  sagaOptions: {
    onCreateSuccess() { // don't have yield
      history.push('/settings/categories')
    },
    * onUpdateSuccess() {
      if (history.location.pathname === '/settings/categories') {
        yield put(categoryStore.actions.getListAction())
      } else {
        history.push('/settings/categories')
      }
    },
    * onDeleteSuccess() {
      yield put(categoryStore.actions.getListAction())
    },
  },
})

export const constants = productStore.constants
export const actions = productStore.actions
export const reducer = productStore.reducer
export const saga = productStore.saga
export const selectors = productStore.selectors
export default reducer
```

### 2. Override Actions

```javascript
const customStore = createBaseStore({
  name: 'custom',
  api: customApi,
  overrides: {
    actions: {
      // Thêm action mới
      customAction: (data) => ({
        type: constants.CUSTOM_ACTION,
        data,
      }),
      // Override action hiện có
      getListAction: (params) => ({
        type: constants.GET_LIST_REQUEST,
        params: {
          ...params,
          custom: true,
        },
      }),
    },
  },
})
```

### 3. Override Reducer

```javascript
const customStore = createBaseStore({
  name: 'custom',
  api: customApi,
  overrides: {
    reducer: (state, action) => {
      // Custom reducer logic
      switch (action.type) {
        case constants.CUSTOM_ACTION:
          return { ...state, custom: action.data }
        default:
          // Fallback to base reducer
          return baseReducer(state, action)
      }
    },
  },
})
```

### 4. Override Saga

```javascript
import { takeEvery, call, put } from 'redux-saga/effects'

const customStore = createBaseStore({
  name: 'custom',
  api: customApi,
  overrides: {
    saga: function* rootSaga() {
      yield takeEvery(constants.GET_LIST_REQUEST, customGetListSaga)
      yield takeEvery(constants.CREATE_REQUEST, customCreateSaga)
      // ... other sagas
    },
  },
})
```

### 5. Override Selectors

```javascript
const customStore = createBaseStore({
  name: 'custom',
  api: customApi,
  overrides: {
    selectors: {
      // Thêm selector mới
      totalCount: () => createSelector(
        selectState,
        (state) => state.list?.total || 0,
      ),
      // Override selector hiện có
      list: () => createSelector(
        selectState,
        (state) => state.list?.items || [],
      ),
    },
  },
})
```

### 6. Override Initial State

```javascript
const customStore = createBaseStore({
  name: 'custom',
  api: customApi,
  overrides: {
    initialState: {
      customField: null,
      customFlag: false,
    },
  },
})
```

## 📋 API Reference

### `createBaseStore(config)`

#### Parameters

- `config.name` (required): Tên module (string)
- `config.api` (required): Object chứa các API functions
  - `api.list(params)`: Lấy danh sách
  - `api.store(data)`: Tạo mới
  - `api.detail(id, params)`: Lấy chi tiết
  - `api.update(id, data)`: Cập nhật
  - `api.destroy(id)`: Xóa
- `config.sagaOptions` (optional): Options cho saga
  - `listParams`: Default params cho list API
  - `detailParams`: Default params cho detail API
  - `onCreateSuccess`: Callback khi create thành công
  - `onUpdateSuccess`: Callback khi update thành công
  - `onDeleteSuccess`: Callback khi delete thành công
- `config.overrides` (optional): Override/extend base functionality
  - `overrides.actions`: Custom actions
  - `overrides.reducer`: Custom reducer
  - `overrides.saga`: Custom saga
  - `overrides.selectors`: Custom selectors
  - `overrides.initialState`: Custom initial state

#### Returns

```javascript
{
  constants: { ... },      // Action type constants
  actions: { ... },         // Action creators
  reducer: Function,       // Reducer function
  saga: Function,          // Root saga function
  selectors: { ... },       // Selector functions
  initialState: { ... },   // Initial state
}
```

## 📦 Base Features

### Constants
- `GET_LIST_REQUEST` / `GET_LIST_SUCCESS`
- `CREATE_REQUEST` / `CREATE_SUCCESS`
- `GET_DETAIL_REQUEST` / `GET_DETAIL_SUCCESS`
- `UPDATE_REQUEST` / `UPDATE_SUCCESS`
- `DELETE_REQUEST` / `DELETE_SUCCESS`
- `HANDLE_ERROR`

### Actions
- `getListAction(params)`
- `createAction(data)`
- `getDetailAction(id, params)`
- `updateAction(id, data)`
- `deleteAction(id)`
- `handleErrorAction(error)`

### State Structure
```javascript
{
  loading: false,
  submitting: false,
  error: null,
  list: null,
  detail: null,
  getListSuccess: null,
  getDetailSuccess: null,
  createSuccess: null,
  updateSuccess: null,
  deleteSuccess: null,
}
```

### Selectors
- `loading()`: Loading state
- `submitting()`: Submitting state
- `error()`: Error state
- `list()`: List data
- `detail()`: Detail data
- `byId(id)`: Get item by ID from list
- `getListSuccess()`: Success flag
- `createSuccess()`: Success flag
- `updateSuccess()`: Success flag
- `deleteSuccess()`: Success flag

## 💡 Examples

### Example 1: Category Module (Current Implementation)

Xem `src/store/modules/category/index.jsx`

### Example 2: Custom Behavior

```javascript
const productStore = createBaseStore({
  name: 'product',
  api: productApi,
  sagaOptions: {
    onCreateSuccess: function* (data, payload, actions) {
      // Custom logic after create
      yield put(actions.getListAction()) // Refresh list
      yield put(history.push('/products'))
    },
  },
  overrides: {
    selectors: {
      availableProducts: () => createSelector(
        selectState,
        (state) => state.list?.items?.filter(p => p.stock > 0) || [],
      ),
    },
  },
})
```

## 🔄 Migration Guide

### From Old Pattern to Base Store

**Before:**
```javascript
// constants.jsx
export const GET_LIST_REQUEST = 'category/GET_LIST_REQUEST'
// ...

// actions.jsx
export function getListAction(params) { ... }
// ...

// reducer.jsx
export default function reducer(state, action) { ... }
// ...
```

**After:**
```javascript
// index.jsx
import { createBaseStore } from '../../base'

const categoryStore = createBaseStore({
  name: 'category',
  api: categoryApi,
  sagaOptions: { ... },
})

export const { constants, actions, reducer, saga, selectors } = categoryStore
export default reducer
```

## ✅ Benefits

1. **DRY (Don't Repeat Yourself)**: Code tái sử dụng, không lặp lại
2. **Consistency**: Tất cả module có cấu trúc giống nhau
3. **Maintainability**: Dễ bảo trì, chỉ sửa một chỗ
4. **Flexibility**: Dễ override/extend khi cần
5. **Type Safety**: Có thể dễ dàng thêm TypeScript sau

## 🐛 Troubleshooting

### Circular Dependency
Nếu gặp lỗi circular dependency, đảm bảo các file re-export không import lẫn nhau.

### Custom Saga Not Working
Kiểm tra xem bạn có đúng format `function*` và sử dụng `yield` đúng cách.

### Selector Not Found
Đảm bảo selector được export đúng cách trong `overrides.selectors`.

