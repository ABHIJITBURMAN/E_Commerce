import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constant/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: false, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: true, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { products: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: false, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: true, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: true, error: action.payload }
    default:
      return { state }
  }
}
