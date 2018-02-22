import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

const userInitialState = {
  authenticated: false,
  sessionId: '',
  user: {}
}

const uiInitialState = {
  isLoading: false,
  errorMessage: ''
}

const recommendationsInitialState = {
  timelineRecommendations: []
}

// USER REDUCER
export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log(action)
      return Object.assign({}, state, { sessionId: action.data.sessionId, user: action.data.user, authenticated: true })
    case actionTypes.LOGOUT_USER:
      return Object.assign({}, state, { sessionId: '', user: {}, authenticated: false })
    case actionTypes.CREATE_ACCOUNT:
      return Object.assign({}, state, { sessionId: action.data.sessionId, user: action.data.user, authenticated: true })
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

export const recommendations = (state = recommendationsInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EXPLORE_RECOMMENDATIONS:
      return Object.assign({}, state, { timelineRecommendations: action.recommendations })
    default:
      return state
  }
}

// MAIN REDUCER
export const mainReducer = combineReducers({
  user,
  ui,
  recommendations
})
