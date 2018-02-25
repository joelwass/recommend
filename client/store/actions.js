import Cookie from 'js-cookie'
import { SESSION_COOKIE } from '../helper/constants'
import * as actionTypes from './actionTypes'
import API from '../helper/api'

// USER ACTIONS
export const getUsers = (excludeId) => (dispatch) => {
  dispatch(setLoading(true))
  API.getUsers().then((res) => {
    if (res.success) {
      dispatch({
        type: actionTypes.SET_USERS,
        users: excludeId ? res.users.filter(x => x.id !== excludeId) : res.users
      })
    } else {
      dispatch(setError(res.error))
    }
    dispatch(setLoading(false))
  })
}
export const setUser = (data) => (dispatch) => {
  // set the cookie so we can resume easier
  Cookie.set(SESSION_COOKIE, data.sessionId)
  return dispatch({ type: actionTypes.SET_USER, data })
}

export const logoutUser = () => (dispatch) => {
  Cookie.remove(SESSION_COOKIE)
  return dispatch({ type: actionTypes.LOGOUT_USER })
}

export const createAccount = (accountDetails) => (dispatch) => {
  dispatch(clearErrors())
  dispatch(setLoading(true))
  API.createNewUser(accountDetails).then((res) => {
    if (res.success) {
      dispatch({ type: actionTypes.CREATE_ACCOUNT, data: res })
    } else {
      dispatch(setError(res.error))
    }
    dispatch(setLoading(false))
  })
}

export const login = (credentials) => (dispatch) => {
  dispatch(clearErrors())
  dispatch(setLoading(true))
  API.login(credentials).then((res) => {
    if (res.success) {
      dispatch(setUser(res))
    } else {
      dispatch(setError(res.error))
    }
    dispatch(setLoading(false))
  })
}

export const logout = () => (dispatch) => {
  dispatch(setLoading(true))
  API.logout().then((res) => {
    if (res.success) {
      dispatch(logoutUser())
    } else {
      dispatch(setError('Error logging out'))
    }
    dispatch(setLoading(false))
  })
}

export const resume = (sessionKey) => (dispatch) => {
  dispatch(setLoading(true))
  API.resume(sessionKey).then((res) => {
    if (res.success) {
      dispatch(setUser(res))
    }
    dispatch(setLoading(false))
  })
}

// UI ACTIONS
export const setError = (errorMessage) => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR, errorMessage })
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR, errorMessage: '' })
}

export const setLoading = (loading) => (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING, loading })
}

// RECOMMENDATION ACTIONS
export const getRecommendations = () => (dispatch) => {
  API.getAllRecommendations().then((res) => {
    if (res.success) dispatch({ type: actionTypes.SET_EXPLORE_RECOMMENDATIONS, recommendations: res.recommendations })
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}

export const getRecommendationCategories = () => (dispatch) => {
  API.getRecommendationCategories().then((res) => {
    if (res.success) dispatch({ type: actionTypes.SET_RECOMMENDATION_CATEGORIES, categories: res.categories })
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}

export const createRecommendation = (recommendation) => (dispatch) => {
  API.makeRecommendation(recommendation).then((res) => {
    if (res.success) console.log('Recommendation created succesfully')
    else dispatch({ type: actionTypes.SET_ERROR, errorMessage: res.error })
  })
}
