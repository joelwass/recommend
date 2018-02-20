import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { logout } from '../store/actions'

const Logout = (props) => (
  <div>
    <h1>now on the logout page.</h1>
    <p>am i authenticated? {props.authenticated ? 'yes' : 'no'}</p>
    <button onClick={() => props.setAuthenticated(false)}>log me out</button>
    <Link href='/'><a>back to index page</a></Link>
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: bindActionCreators(logout, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Logout)
