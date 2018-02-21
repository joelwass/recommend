import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import Layout from '../components/Layout'
import { login } from '../store/actions'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleLoginInput = this.handleLoginInput.bind(this)
  }

  handleLoginInput (e, key) {
    this.setState({ [key]: e.target.value })
  }

  render () {
    return (
      <Layout>
        <form className='login-form'>
          <h1 className='login-header'>Sign In</h1>
          <input
            type='email'
            onChange={(e) => this.handleLoginInput(e, 'email')}
            placeholder='Email' />
          <input
            type='password'
            onChange={(e) => this.handleLoginInput(e, 'password')}
            placeholder='Password' />
          <button
            className='login-form__button'
            onClick={() => this.props.login({ email: this.state.email, password: this.state.password })}
          >
            Enter
          </button>
          <div className='login-form__register'>
            <p>Don't have an account yet?</p>
            <Link href='/register'><a>create one</a></Link>
          </div>
        </form>
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
