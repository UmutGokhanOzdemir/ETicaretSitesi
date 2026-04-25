import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS
} from '../actions/cartActions'

const initialState = {
  cart: [],        // [{ count: 1, checked: true, product: {...} }]
  payment: {},
  address: {}
}

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload }
    case SET_PAYMENT:
      return { ...state, payment: action.payload }
    case SET_ADDRESS:
      return { ...state, address: action.payload }
    default:
      return state
  }
}
