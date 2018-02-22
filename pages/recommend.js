import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
// import Select from 'react-virtualized-select'
// import { getIndexedOptions } from '../client/selector'
import { initStore } from '../store'
import {
  getRecommendationCategories,
  createRecommendation,
  setError,
  clearErrors } from '../store/actions'
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
      isValid: false
    }
    this.handleCreateRecommendationInput = this.handleCreateRecommendationInput.bind(this)
    this.handleCreateRecommendation = this.handleCreateRecommendation.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  componentDidMount () {
    if (this.props.authenticated) {
      // get categories from api
      this.props.getRecommendationCategories()
      // set from_user id
      this.setState((prevState) => ({
        recommendation: {
          ...prevState.recommendation,
          from_user: this.props.userId
        }
      }))
    }
  }

  handleCreateRecommendationInput (e, key) {
    this.setState({ details: Object.assign(this.state.recommendation, { [key]: e.target.value }) })
  }

  handleCreateRecommendation () {
    this.props.createRecommendation(this.state.recommendation)
  }

  // validate the recommend details
  validateInput (e) {
    e.preventDefault()
    this.props.clearErrors()
    const keys = Object.keys(this.state.recommendation)
    if (!keys.every(key => !!this.state.recommendation[key])) {
      this.setState({ isValid: false })
      this.props.setError('Invalid create recommendation details')
    } else {
      this.setState({ isValid: true })
      this.handleCreateRecommendation()
    }
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
            <Dropdown name='category' id='category' options={this.props.categories} onChangeHandler={this.handleCreateRecommendationInput} />
            <button onClick={this.validateInput}>Submit Recommendation</button>
          </form>
        }
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setError: bindActionCreators(setError, dispatch),
    clearErrors: bindActionCreators(clearErrors, dispatch),
    createRecommendation: bindActionCreators(createRecommendation, dispatch),
    getRecommendationCategories: bindActionCreators(getRecommendationCategories, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    categories: state.recommendations.categories,
    userId: state.user.user.id
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Recommend)
