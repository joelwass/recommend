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
    case actionTypes.SET_USER:
      return Object.assign({}, state, { sessionId: action.sessionId, user: action.user, authenticated: true })
    case actionTypes.LOGOUT_USER:
      return Object.assign({}, state, { sessionId: '', user: {}, authenticated: false })
    case actionTypes.CREATE_ACCOUNT:
      return Object.assing({}, state, { sessionId: action.sessionId, user: action.user, authenticated: true })
    default:
      return state
  }
}

export const ui = (state = uiInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return Object.assign({}, state, { isLoading: action.isLoading })
    case actionTypes.SET_ERROR:
      return Object.assign({}, state, { errorMessage: action.errorMessage })
    default:
      return state
  }
}

// MAIN REDUCER
export const mainReducer = combineReducers({
  user,
  ui
})
