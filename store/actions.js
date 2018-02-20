import * as actionTypes from './actionTypes'

// ACTIONS
export const setAuthenticated = (authenticated) => (dispatch) => {
  return dispatch({ type: actionTypes.SET_AUTHENTICATED, authenticated })
}

// this.props.dispatch(login(username, password))

export const login = (username, password) => (dispatch) => {
  // make your api request
  // .then((res) => {
  //   dispatch(setAuthenticated(true));
  // })
}
