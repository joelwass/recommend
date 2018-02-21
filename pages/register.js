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
  validateCreds () {
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
        <h1>now on the create account page.</h1>
        <p>email</p>
        <input
          type='text'
          onChange={(e) => this.handleCreateAccountInput(e, 'email')} />
        <p>password</p>
        <input
          type='text'
          onChange={(e) => this.handleCreateAccountInput(e, 'password')} />
        <p>first name</p>
        <input
          type='text'
          onChange={(e) => this.handleCreateAccountInput(e, 'firstName')} />
        <p>last name</p>
        <input
          type='text'
          onChange={(e) => this.handleCreateAccountInput(e, 'lastName')} />
        <p>password</p>
        <input
          type='date'
          onChange={(e) => this.handleBirthdayInput(e)} />
        <button onClick={() => this.validateCreds(this.state)}>Create Account</button>
        <p>Already have an account?</p>
        <Link href='/login'><a>Log in</a></Link>
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
