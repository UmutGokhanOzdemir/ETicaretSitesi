// Action Type Constants
export const SET_CART = 'SET_CART'
export const SET_PAYMENT = 'SET_PAYMENT'
export const SET_ADDRESS = 'SET_ADDRESS'

const CART_STORAGE_KEY = 'cart'

// LocalStorage helpers
export const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const persistCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch {
    /* ignore quota errors */
  }
}

// Plain Action Creators
export const setCart = (cart) => {
  persistCart(cart)
  return { type: SET_CART, payload: cart }
}
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })

// Bootstrap thunk: localStorage'tan yükle
export const hydrateCart = () => (dispatch) => {
  const cart = loadCartFromStorage()
  if (cart.length) dispatch(setCart(cart))
}

// Helper thunks
export const addToCart = (product) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const existing = shoppingCart.cart.find((item) => item.product.id === product.id)

  const newCart = existing
    ? shoppingCart.cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item
      )
    : [...shoppingCart.cart, { count: 1, checked: true, product }]

  dispatch(setCart(newCart))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const newCart = shoppingCart.cart.filter((item) => item.product.id !== productId)
  dispatch(setCart(newCart))
}

export const updateCartCount = (productId, delta) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const newCart = shoppingCart.cart
    .map((item) =>
      item.product.id === productId
        ? { ...item, count: Math.max(0, item.count + delta) }
        : item
    )
    .filter((item) => item.count > 0)
  dispatch(setCart(newCart))
}

export const toggleCartChecked = (productId) => (dispatch, getState) => {
  const { shoppingCart } = getState()
  const newCart = shoppingCart.cart.map((item) =>
    item.product.id === productId
      ? { ...item, checked: !item.checked }
      : item
  )
  dispatch(setCart(newCart))
}
