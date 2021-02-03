import axios from 'axios'

const LOAD_CATEGORIES_REQUEST = 'app/category/LOAD_CATEGORIES_REQUEST'
const LOAD_CATEGORIES_SUCCESS = 'app/category/LOAD_CATEGORIES_SUCCESS'
const LOAD_CATEGORIES_FAILURE = 'app/category/LOAD_CATEGORIES_FAILURE'

function loadCategory() {
  return async (dispatch) => {
    dispatch({ type: LOAD_CATEGORIES_REQUEST })
    try {
      const { data } = await axios.get('/categories')
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: { categories: data.category },
      })
    } catch (error) {
      dispatch({ type: LOAD_CATEGORIES_FAILURE })
    }
  }
}

export {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  loadCategory,
}
