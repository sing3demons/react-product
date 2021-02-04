const TOGGLE_DARK_MODE = 'app/ui/TOGGLE_DARK_MODE'
const SET_DARK_MODE = 'app/ui/SET_DARK_MODE'

function toggleDarkMode() {
  return {
    type: TOGGLE_DARK_MODE,
  }
}

function setDarkMode(darkMode) {
  return {
    type: SET_DARK_MODE,
    payload: {
      darkMode,
    },
  }
}

export { TOGGLE_DARK_MODE, SET_DARK_MODE, toggleDarkMode, setDarkMode }
