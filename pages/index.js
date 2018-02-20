import React from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'

class Index extends React.Component {

  constructor(props) {
    super(props)
  }

  userDash = () => {
    return <h1>Welcome back User!</h1>
  }

  splashPage = () => {
    return <h1>Welcome to our hot app.</h1>
  }

  render () {
    let body = null
    if (this.props.authenticated) body = this.userDash()
    else body = this.splashPage()

    return (
      <Layout>
        <div>
          {body}
        </div>
      </Layout>
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
