import * as actionTypes from './actionTypes'
import API from '../client/api'

// ACTIONS
export const setUser = (user) => (dispatch) => {
  return dispatch({ type: actionTypes.SET_USER, user })
}

export const logoutUser = () => (dispatch) => {
  return dispatch({ type: actionTypes.LOGOUT_USER })
}

export const createAccount = (accountDetails) => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR, errorMessage: '' })
  dispatch({ type: actionTypes.SET_LOADING, ui: { isLoading: true } })
  API.createNewUser(accountDetails).then((res) => {
    if (res.success) dispatch({ type: actionTypes.CREATE_ACCOUNT, res })
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}

export const login = (credentials) => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR, errorMessage: '' })
  dispatch({ type: actionTypes.SET_LOADING, ui: { isLoading: true } })
  API.login(credentials).then((res) => {
    if (res.success) dispatch(setUser(res))
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}

export const logout = () => (dispatch) => {
  API.logout().then((res) => {
    if (res.success) dispatch(logoutUser())
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: 'Error logging out' })
  })
}

export const setError = (errorMessage) => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR, errorMessage })
}

export const getRecommendations = () => (dispatch) => {
  API.getAllRecommendations().then((res) => {
    if (res.success) dispatch({ type: actionTypes.SET_EXPLORE_RECOMMENDATIONS, recommendations: res.recommendations })
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}

export const createRecommendation = (recommendation) => (dispatch) => {
  API.makeRecommendation(recommendation).then((res) => {
    if (res.success) console.log('Recommendation created succesfully')
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}
