import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import Layout from '../components/Layout'
import { login } from '../store/actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleLoginInput = (e, key) => {
    this.setState({ [key]: e.target.value })
  }

  render() {
    return (
      <Layout>
        <h1>Login or Sign Up</h1>
        <p>am i authenticated? {this.props.authenticated ? 'yes' : 'no'}</p>
        <p>Email</p>
        <input
          type="text"
          onChange={(e) => this.handleLoginInput(e, 'email')}/>
        <p>Password</p>
        <input
          type="text"
          onChange={(e) => this.handleLoginInput(e, 'password')}/>
        <button onClick={() => this.props.login({ email: this.state.email, password: this.state.password })}>log me in</button>
        <p>Don't have an account yet?</p>
        <Link href='/register'><a>create one</a></Link>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Login)
