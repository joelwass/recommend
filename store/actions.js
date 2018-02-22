import * as actionTypes from './actionTypes'
import { API } from '../client'

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

export const logout = (username, password) => (dispatch) => {
  API.logout({ username, password }).then((res) => {
    if (res.success) dispatch(logoutUser())
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: 'Error logging out' })
  })
}

export const getRecommendations = () => (dispatch) => {
  API.getAllRecommendations()
}
