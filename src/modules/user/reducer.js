import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from './actions'

const initialState = {
  profile: null,
  isAuth: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isAuth: false }
    case LOGIN_SUCCESS:
    case GET_PROFILE_SUCCESS:
      return { ...state, isAuth: true, profile: payload.profile }
    case LOGIN_FAILURE:
    case GET_PROFILE_FAILURE:
      return { ...state, isAuth: false, profile: null }
    default:
      return state
  }
}
