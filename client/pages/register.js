import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import Layout from '../components/Layout'
import { createAccount } from '../store/actions'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      details: {
        email: undefined,
        password: undefined,
        firstName: undefined,
        lastName: undefined,
        birthday: undefined
      },
      isValid: false
    }
    this.handleCreateAccountInput = this.handleCreateAccountInput.bind(this)
    this.handleBirthdayInput = this.handleBirthdayInput.bind(this)
    this.validateCreds = this.validateCreds.bind(this)
  }

  handleCreateAccountInput (e, key) {
    this.setState({ details: Object.assign(this.state.details, { [key]: e.target.value }) })
  }

  handleBirthdayInput (e) {
    const date = new Date(e.target.value)
    this.setState({ details: Object.assign(this.state.details, { birthday: date.getTime() }) })
  }

  // validate the users inputted details
  validateCreds (e) {
    e.preventDefault()
    const keys = Object.keys(this.state.details)
    let valid = true
    keys.forEach(key => {
      if (!this.state.details[key]) {
        this.setState({ isValid: false })
        valid = false
      }
    })
    if (valid) {
      this.setState({ isValid: true })
      this.props.createAccount(this.state.details)
    }
  }

  render () {
    return (
      <Layout>
        <form className='form'>
          <h1>Create An Account</h1>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => this.handleCreateAccountInput(e, 'email')} />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => this.handleCreateAccountInput(e, 'password')} />
          <input
            type='text'
            placeholder='First Name'
            onChange={(e) => this.handleCreateAccountInput(e, 'firstName')} />
          <input
            type='text'
            placeholder='Last Name'
            onChange={(e) => this.handleCreateAccountInput(e, 'lastName')} />
          <input
            type='date'
            onChange={(e) => this.handleBirthdayInput(e)} />
          <button className='form-button' onClick={this.validateCreds}>Create Account</button>
          <div className='form-option'>
            <p>Already have an account?</p>
            <Link href='/login'><a>Log in</a></Link>
          </div>
        </form>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: bindActionCreators(createAccount, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.ui.errorMessage,
    userId: state.user.id
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Register)
