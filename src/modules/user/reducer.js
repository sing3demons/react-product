import { GET_PROFILE } from './actions'

const initialState = {
  profile: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload.profile }
    default:
      return state
  }
}
