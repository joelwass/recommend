import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { login } from '../store/actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLoginInput = (e, key) => {
    this.setState({ [key]: e.target.value })
  }

  render() {
    return (
      <div>
        <h1>now on the login page.</h1>
        <p>am i authenticated? {this.props.authenticated ? 'yes' : 'no'}</p>
        <p>username</p>
        <input
          type="text"
          onChange={(e) => this.handleLoginInput(e, 'username')}/>
        <p>password</p>
        <input
          type="text"
          onChange={(e) => this.handleLoginInput(e, 'password')}/>
        <button onClick={() => this.props.login({ username: this.state.username, password: this.state.password })}>log me in</button>
        <Link href='/'><a>back to index page</a></Link><br/>
        <p>Don't have an account yet?</p>
        <Link href='/createAccount'><a>create one</a></Link>
      </div>
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
