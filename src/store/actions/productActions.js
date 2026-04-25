import axiosInstance from '../../api/axiosInstance'

// Action Type Constants
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST'
export const SET_TOTAL = 'SET_TOTAL'
export const SET_FETCH_STATE = 'SET_FETCH_STATE'
export const SET_LIMIT = 'SET_LIMIT'
export const SET_OFFSET = 'SET_OFFSET'
export const SET_FILTER = 'SET_FILTER'

// fetchState değer sabitleri
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
}

// Plain Action Creators
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories })
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total })
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState })
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit })
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })

// Thunk: categories fetch
export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/categories')
    dispatch(setCategories(res.data))
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

// Thunk: products fetch (query params ile)
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState(FETCH_STATES.FETCHING))
  try {
    const queryParams = new URLSearchParams()
    if (params.category) queryParams.append('category', params.category)
    if (params.filter) queryParams.append('filter', params.filter)
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.offset) queryParams.append('offset', params.offset)

    const url = `/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    const res = await axiosInstance.get(url)

    dispatch(setProductList(res.data.products))
    dispatch(setTotal(res.data.total))
    dispatch(setFetchState(FETCH_STATES.FETCHED))
  } catch (err) {
    dispatch(setFetchState(FETCH_STATES.FAILED))
    console.error('Failed to fetch products:', err)
  }
}
