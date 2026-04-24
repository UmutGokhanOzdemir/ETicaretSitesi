# T09 — Redux Store, Reducers, Action Creators, Thunk

Bu en kritik task. Tüm Redux backbone'unu kuracağız.

## Context
`@00-CONTEXT.md` oku. Bu task vanilla Redux kullanır (Redux Toolkit DEĞİL).

## Kurulum

```bash
npm install redux react-redux redux-thunk redux-logger
```

## Görev

### 1. `src/store/store.js`

```js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import clientReducer from './reducers/clientReducer'
import productReducer from './reducers/productReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer
})

const logger = createLogger({ collapsed: true })

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

export default store
```

### 2. Reducers

**`src/store/reducers/clientReducer.js`:**

```js
const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'tr'
}

export default function clientReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_ROLES':
      return { ...state, roles: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'SET_ADDRESS_LIST':
      return { ...state, addressList: action.payload }
    case 'SET_CREDIT_CARDS':
      return { ...state, creditCards: action.payload }
    default:
      return state
  }
}
```

**`src/store/reducers/productReducer.js`:**

```js
const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED'  // 'NOT_FETCHED' | 'FETCHING' | 'FETCHED' | 'FAILED'
}

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_PRODUCT_LIST':
      return { ...state, productList: action.payload }
    case 'SET_TOTAL':
      return { ...state, total: action.payload }
    case 'SET_FETCH_STATE':
      return { ...state, fetchState: action.payload }
    case 'SET_LIMIT':
      return { ...state, limit: action.payload }
    case 'SET_OFFSET':
      return { ...state, offset: action.payload }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}
```

**`src/store/reducers/shoppingCartReducer.js`:**

```js
const initialState = {
  cart: [],        // [{ count: 1, checked: true, product: {...} }]
  payment: {},
  address: {}
}

export default function shoppingCartReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload }
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload }
    case 'SET_ADDRESS':
      return { ...state, address: action.payload }
    default:
      return state
  }
}
```

### 3. Action Creators

**`src/store/actions/clientActions.js`:**

```js
import axiosInstance from '../../api/axiosInstance'

export const setUser = (user) => ({ type: 'SET_USER', payload: user })
export const setRoles = (roles) => ({ type: 'SET_ROLES', payload: roles })
export const setTheme = (theme) => ({ type: 'SET_THEME', payload: theme })
export const setLanguage = (language) => ({ type: 'SET_LANGUAGE', payload: language })
export const setAddressList = (list) => ({ type: 'SET_ADDRESS_LIST', payload: list })
export const setCreditCards = (cards) => ({ type: 'SET_CREDIT_CARDS', payload: cards })

// Thunk: sadece gerektiğinde roles fetch et
export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState()
  if (client.roles.length > 0) return  // zaten fetch edilmişse tekrar etme
  
  try {
    const res = await axiosInstance.get('/roles')
    dispatch(setRoles(res.data))
  } catch (err) {
    console.error('Failed to fetch roles:', err)
  }
}

// Thunk: verify token (T11 için)
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) return
  
  try {
    const res = await axiosInstance.get('/verify')
    dispatch(setUser(res.data))
    // Yenilenen token'ı kaydet
    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
    }
  } catch (err) {
    localStorage.removeItem('token')
    dispatch(setUser({}))
  }
}
```

**`src/store/actions/productActions.js`:**

```js
import axiosInstance from '../../api/axiosInstance'

export const setCategories = (categories) => ({ type: 'SET_CATEGORIES', payload: categories })
export const setProductList = (productList) => ({ type: 'SET_PRODUCT_LIST', payload: productList })
export const setTotal = (total) => ({ type: 'SET_TOTAL', payload: total })
export const setFetchState = (fetchState) => ({ type: 'SET_FETCH_STATE', payload: fetchState })
export const setLimit = (limit) => ({ type: 'SET_LIMIT', payload: limit })
export const setOffset = (offset) => ({ type: 'SET_OFFSET', payload: offset })
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter })

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
  dispatch(setFetchState('FETCHING'))
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
    dispatch(setFetchState('FETCHED'))
  } catch (err) {
    dispatch(setFetchState('FAILED'))
    console.error('Failed to fetch products:', err)
  }
}
```

**`src/store/actions/cartActions.js`:**

```js
export const setCart = (cart) => ({ type: 'SET_CART', payload: cart })
export const setPayment = (payment) => ({ type: 'SET_PAYMENT', payload: payment })
export const setAddress = (address) => ({ type: 'SET_ADDRESS', payload: address })

// Helper: add product to cart
export const addToCart = (product) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const existingItem = shoppingCart.cart.find(item => item.product.id === product.id)
  
  let newCart
  if (existingItem) {
    // Count'u artır
    newCart = shoppingCart.cart.map(item => 
      item.product.id === product.id 
        ? { ...item, count: item.count + 1 } 
        : item
    )
  } else {
    // Yeni ekle
    newCart = [...shoppingCart.cart, { count: 1, checked: true, product }]
  }
  
  dispatch(setCart(newCart))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const newCart = shoppingCart.cart.filter(item => item.product.id !== productId)
  dispatch(setCart(newCart))
}

export const updateCartCount = (productId, delta) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const newCart = shoppingCart.cart
    .map(item => 
      item.product.id === productId 
        ? { ...item, count: Math.max(0, item.count + delta) } 
        : item
    )
    .filter(item => item.count > 0)
  dispatch(setCart(newCart))
}

export const toggleCartChecked = (productId) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const newCart = shoppingCart.cart.map(item => 
    item.product.id === productId 
      ? { ...item, checked: !item.checked } 
      : item
  )
  dispatch(setCart(newCart))
}
```

### 4. Provider ile Sarmala

`src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
```

### 5. SignUp ve Login'i Redux'a Bağla

**SignUpPage.jsx:**
- `useDispatch` ve `useSelector` kullan
- `useEffect`'te `dispatch(fetchRoles())` çağır
- `roles = useSelector(s => s.client.roles)` ile role listesini al
- Role select'te bu data'yı kullan

**LoginPage.jsx:**
- Başarılı login sonrası `dispatch(setUser(res.data))` çağır
- localStorage kısmı olduğu gibi kalsın

**Header.jsx:**
- `const user = useSelector(s => s.client.user)` 
- `user.email` varsa avatar+isim, yoksa "Login/Register" göster

## Kalite Kriterleri
- Her reducer ayrı dosya
- Her reducer'da initialState, default case, ...state spread
- Actions ayrı dosya, type string'leri büyük harf SNAKE_CASE
- Thunk action'lar `(dispatch) => async ...` formatı
- State değişiklikleri tamamen immutable

## Test
1. Console'da redux-logger çıktıları görünmeli (action + state)
2. SignUp sayfasında roles select doluyor mu?
3. Login sonrası Header'da avatar + isim görünüyor mu?
4. Redux DevTools kurduysan bağlanıyor mu?

## Commit
```bash
git add .
git commit -m "feat(T09): initialize Redux store with reducers, thunk middleware, and action creators"
git push
```
