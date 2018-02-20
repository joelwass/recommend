import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { createAccount } from '../store/actions'

class CreateAccount extends React.Component {
  constructor(props) {
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
  }

  handleCreateAccountInput = (e, key) => {
    this.setState({ details: Object.assign(this.state.details, { [key]: e.target.value }) })
  }

  handleBirthdayInput = (e, key) => {
    this.setState({ details: Object.assign(this.state.details, { birthday: e.target.value }) })
  }

  // validate the users inputted details
  validateCreds = () => {
    const keys = Object.keys(this.state.details)
    let valid = true
    keys.forEach(key => {
      if (!this.state.details[key]) {
        this.setState({ isValid: false })
        valid = false
      }
    })
    if (valid) this.setState({ isValid: true })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>now on the create account page.</h1>
        <p>email</p>
        <input
          type="text"
          onChange={(e) => this.handleCreateAccountInput(e, 'email')}/>
        <p>password</p>
        <input
          type="text"
          onChange={(e) => this.handleCreateAccountInput(e, 'password')}/>
        <p>first name</p>
        <input
          type="text"
          onChange={(e) => this.handleCreateAccountInput(e, 'firstName')}/>
        <p>last name</p>
        <input
          type="text"
          onChange={(e) => this.handleCreateAccountInput(e, 'lastName')}/>
        <p>password</p>
        <input
          type="date"
          onChange={(e) => this.handleBirthdayInput(e)}/>
        <button onClick={() => this.validateCreds(this.state)}>Create Account</button>
        <Link href='/'><a>back to index page</a></Link><br/>
        <p>Already have an account?</p>
        <Link href='/login'><a>Log in</a></Link>
      </div>
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
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(CreateAccount)
