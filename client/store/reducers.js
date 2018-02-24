import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

const userInitialState = {
  authenticated: false,
  sessionId: '',
  user: {},
  users: []
}

const uiInitialState = {
  isLoading: false,
  errorMessage: ''
}

const recommendationsInitialState = {
  categories: [],
  timelineRecommendations: []
}

// USER REDUCER
export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return Object.assign({}, state, { sessionId: action.data.sessionId, user: action.data.user, authenticated: true })
    case actionTypes.SET_USERS:
      return Object.assign({}, state, { users: action.users })
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
    case actionTypes.SET_RECOMMENDATION_CATEGORIES:
      return Object.assign({}, state, { categories: action.categories })
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
