import axios from 'axios'

const GET_PROFILE = 'app/users/GET_PROFILE'

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

export { GET_PROFILE, loginSuccess, updateProfile }
