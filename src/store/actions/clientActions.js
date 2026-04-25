import axiosInstance from '../../api/axiosInstance'

// Action Type Constants
export const SET_USER = 'SET_USER'
export const SET_ROLES = 'SET_ROLES'
export const SET_THEME = 'SET_THEME'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST'
export const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS'

// Plain Action Creators
export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })
export const setAddressList = (list) => ({ type: SET_ADDRESS_LIST, payload: list })
export const setCreditCards = (cards) => ({ type: SET_CREDIT_CARDS, payload: cards })

// Thunk: cache'li roles fetch
export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState()
  if (client.roles.length > 0) return
  try {
    const res = await axiosInstance.get('/roles')
    dispatch(setRoles(res.data))
  } catch (err) {
    console.error('Failed to fetch roles:', err)
  }
}

// Thunk: token verify (T11 hazırlığı)
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await axiosInstance.get('/verify')
    dispatch(setUser(res.data))
    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
    }
  } catch {
    localStorage.removeItem('token')
    dispatch(setUser({}))
  }
}
