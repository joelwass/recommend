import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { setAuthenticated } from '../store/actions'

class Index extends React.Component {
  render () {
    return (
      <div>
        <h1>I am currently {!this.props.authenticated && 'not'} authenticated</h1>
        <button onClick={() => this.props.setAuthenticated(true)}>Authenticate</button>
        <Link href='/logout'><a>Go to logout page</a></Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: bindActionCreators(setAuthenticated, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
