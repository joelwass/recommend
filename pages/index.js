import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'

class Index extends React.Component {
  render () {
    return (
      <div>
        <h1>I am currently {!this.props.authenticated && 'not'} authenticated</h1>
        <Link href='/logout'><a>Go to logout page</a></Link><br/>
        <Link href='/login'><a>Login</a></Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
