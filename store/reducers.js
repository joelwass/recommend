import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

const userInitialState = {
  authenticated: false,
  sessionId: '',
  user: {}
}

const uiInitialState = {
  isLoading: false
}

// USER REDUCER
export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED:
      return Object.assign({}, state, { authenticated: action.authenticated })
    case actionTypes.SET_SESSION_ID:
      return Object.assign({}, state, { sessionId: action.sessionId })
    case actionTypes.SET_USER:
      return Object.assign({}, state, { user: action.user })
    default:
      return state
  }
}

export const ui = (state = uiInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return Object.assign({}, state, { isLoading: action.isLoading })
    default:
      return state
  }
}

// MAIN REDUCER
export const mainReducer = combineReducers({
  user,
  ui
})
