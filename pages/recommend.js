import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { createRecommendation, setError, clearErrors } from '../store/actions'
import Layout from '../components/Layout'
import Dropdown from '../components/Dropdown'
import React from 'react'

class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recommendation: {
        to_user: undefined,
        from_user: undefined,
        subject: undefined,
        prediction: true,
        category: undefined
      },
      isValid: false,
      options: ['books', 'movies', 'restaurants', 'miscellaneous', 'food', 'activities', 'places', 'music', 'apps', 'games', 'websites']
    }
    this.handleCreateRecommendationInput = this.handleCreateRecommendationInput.bind(this)
    this.handleCreateRecommendation = this.handleCreateRecommendation.bind(this)
    this.validateCreds = this.validateCreds.bind(this)
  }

  componentDidMount () {
    // set dropdown options
    this.setState({ dropdownOptions: this.state.options.map(option => ({ name: option, value: option })) })
    // set from_user id
    this.setState(Object.assign(this.state.recommendation, { from_user: this.props.userId }))
  }

  handleCreateRecommendationInput (e, key) {
    this.setState({ details: Object.assign(this.state.recommendation, { [key]: e.target.value }) })
  }

  handleCreateRecommendation (e) {
    e.preventDefault()
    this.props.createRecommendation(this.state.recommendation)
  }

  // validate the recommend details
  validateCreds (e) {
    this.props.clearErrors()
    e.preventDefault()
    const keys = Object.keys(this.state.recommendation)
    let valid = true
    keys.forEach(key => {
      if (!this.state.recommendation[key]) {
        console.log(key)
        this.setState({ isValid: false })
        valid = false
      }
    })
    if (valid) {
      this.setState({ isValid: true })
      this.props.createRecommendation(this.state.recommendation)
    } else this.props.setError('Invalid create recommendation details')
  }

  render () {
    return (
      <Layout>
        <h1>Recommend</h1>
        { !this.props.authenticated
          ? <p>Please log in to make a recommendation</p>
          : <form>
            <p>Make a recommendation:</p>
            Userid of recipient:
            <input type='text' onChange={(e) => this.handleCreateRecommendationInput(e, 'to_user')} /><br />
            Subject of recommendation:
            <input type='text' onChange={(e) => this.handleCreateRecommendationInput(e, 'subject')} /><br />
            Category of recommendation:
            <Dropdown name='category' id='category' options={this.state.dropdownOptions} onChangeHandler={this.handleCreateRecommendationInput} />
            <button onClick={this.validateCreds}>Submit Recommendation</button>
          </form>
        }
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setError: bindActionCreators(setError, dispatch),
    createRecommendation: bindActionCreators(createRecommendation, dispatch),
    clearErrors: bindActionCreators(clearErrors, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user.user && state.user.user && state.user.user.user.id
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Recommend)
