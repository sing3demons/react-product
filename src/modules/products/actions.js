import axios from 'axios'

const LOAD_PRODUCTS_REQUEST = 'app/products/LOAD_PRODUCTS_REQUEST'
const LOAD_PRODUCTS_SUCCESS = 'app/products/LOAD_PRODUCTS_SUCCESS'
const LOAD_PRODUCTS_FAILURE = 'app/products/LOAD_PRODUCTS_FAILURE'
const LOAD_PRODUCT_REQUEST = 'app/products/LOAD_PRODUCT_REQUEST'
const LOAD_PRODUCT_SUCCESS = 'app/products/LOAD_PRODUCT_SUCCESS'
const LOAD_PRODUCT_FAILURE = 'app/products/LOAD_PRODUCT_FAILURE'

function loadProducts(query) {
  return async (dispatch) => {
    dispatch({ type: LOAD_PRODUCTS_REQUEST })
    try {
      const { data } = await axios.get(`/products${query}`)

      dispatch({
        type: LOAD_PRODUCTS_SUCCESS,
        payload: {
          products: data.products.items,
          paging: data.products.paging,
        },
      })
    } catch (error) {
      dispatch({ type: LOAD_PRODUCTS_FAILURE })
    }
  }
}

function loadProduct(id) {
  return async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT_REQUEST })
    try {
      const { data } = await axios.get(`/products/${id}`)

      dispatch({
        type: LOAD_PRODUCT_SUCCESS,
        payload: { product: data.product },
      })
    } catch (error) {
      dispatch({ type: LOAD_PRODUCT_FAILURE })
    }
  }
}

export {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  loadProducts,
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  loadProduct,
}
