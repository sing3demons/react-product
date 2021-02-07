import axios from 'axios'

const LOGIN_REQUEST = 'app/users/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'app/users/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'app/users/LOGIN_FAILURE'

const LOAD_PROFILE_REQUEST = 'app/users/LOAD_PROFILE_REQUEST'
const LOAD_PROFILE_SUCCESS = 'app/users/LOAD_PROFILE_SUCCESS'
const LOAD_PROFILE_FAILURE = 'app/users/LOAD_PROFILE_FAILURE'
const GET_PROFILE = 'GET_PROFILE'

function loginSuccess({ email, password }) {
  return async (dispatch) => {
    const { data } = await axios.post('/auth/login', { email, password })
    localStorage.setItem('token', JSON.stringify(data))
    const getProfile = await axios.get('/auth/profile', {
      headers: { Authorization: `Bearer ${data.token}` },
    })
    localStorage.setItem('profile', JSON.stringify(getProfile.data.user))
  }
}

const updateProfile = (profile) => {
  return {
    type: GET_PROFILE,
    payload: { profile },
  }
}

export {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_PROFILE,
  updateProfile,
  loginSuccess,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
}
