import httpRequest from '../services/httpRequest'
import createBaseApi from './base'

const authApi = createBaseApi(null, {
  sync: () => httpRequest.get('/sync'),
  login: (formData) => httpRequest.post('/login', formData),
  logout: () => httpRequest.post('/logout'),
  register: (formData) => httpRequest.post('/register', formData),
  verify: (token) => httpRequest.post(`/verify/${token}`),
  forgotPassword: (formData) => httpRequest.post('/forgot-password', formData),
  resetPassword: (id, formData) => httpRequest.patch(`/reset-password/${id}`, formData),
})

export default authApi
