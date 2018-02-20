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
  dispatch({ type: actionTypes.SET_LOADING, ui: { isLoading: true } })
  API.createNewUser(credentials).then((res) => {
    if (res.success) dispatch({ type: actionTypes.CREATE_ACCOUNT, res })
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.message })
  })
}

export const login = (credentials) => (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING, ui: { isLoading: true } })
  API.login(credentials).then((res) => {
    dispatch(setUser(res))
  })
}

export const logout = (username, password) => (dispatch) => {
  API.login({ username, password }).then((res) => {
    dispatch(logoutUser())
  })
}
