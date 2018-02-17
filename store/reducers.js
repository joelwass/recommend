import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

const userInitialState = {
  authenticated: false,
  sessionId: '',
  user: {}
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

// MAIN REDUCER
export const mainReducer = combineReducers({
  user
})
