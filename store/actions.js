import * as actionTypes from './actionTypes'

// ACTIONS
export const setAuthenticated = (authenticated) => dispatch => {
  return dispatch({ type: actionTypes.SET_AUTHENTICATED, authenticated })
}
