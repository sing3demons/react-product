import axios from 'axios'

const LOGIN_REQUEST = 'app/users/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'app/users/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'app/users/LOGIN_FAILURE'
const GET_PROFILE_SUCCESS = 'app/users/GET_PROFILE_SUCCESS'
const GET_PROFILE_FAILURE = 'app/users/GET_PROFILE_FAILURE'

function loginSuccess({ email, password }) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
      const { data } = await axios.post('/auth/login', { email, password })
      localStorage.setItem('token', JSON.stringify(data))
      const getProfile = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${data.token}` },
      })
      localStorage.setItem('profile', JSON.stringify(getProfile.data.user))
      dispatch({ type: LOGIN_SUCCESS })
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE })
    }
  }
}

const updateProfile = (profile) => {
  return (dispatch) => {
    if (profile !== null) {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: { profile } })
    } else {
      dispatch({ type: GET_PROFILE_FAILURE, payload: { profile: null } })
    }
  }
}

export {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  loginSuccess,
  updateProfile,
}
