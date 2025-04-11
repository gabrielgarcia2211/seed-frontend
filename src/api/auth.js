import api from '../axios'

export const login = async (credentials) => {
  //await api.get('/sanctum/csrf-cookie')
  return await api.post('/api/user/login', credentials)
}

export const register = async (data) => {
  await api.get('/sanctum/csrf-cookie')
  return await api.post('/api/user/register', data)
}

export const logout = async () => api.post('/api/logout')