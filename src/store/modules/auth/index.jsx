import { createBaseStore } from '../../base'
import history from '../../../utils/history'
import { setToken, logout } from '../../../utils/helpers'

/**
 * Auth Store using Base Store Pattern
 * Auto-load API from src/api/auth.jsx
 * Custom tasks: login, logout
 */
const authStore = createBaseStore({
  name: 'auth',
  tasks: [
    {
      name: 'login',
      endpoint: 'login',
      payload: ['formData'],
      selector: null,
      loadingType: 'submitting',
      saga: {
        after: (data) => {
          setToken(data.access_token)
          history.push('/')
        },
      },
    },
    {
      name: 'logout',
      selector: null,
      loadingType: 'submitting',
      saga: {
        after: () => {
          logout()
        },
      },
    },
  ],
  overrides: {
    initialState: {
      user: null,
      accessToken: null,
    },
  },
})

export default authStore
