import React from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import {
  getRecommendationCategories,
  getUsers,
  createRecommendation,
  setError,
  clearErrors
} from '../store/actions'
import Layout from '../components/Layout'
import Dropdown from '../components/Dropdown'

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
    this.handleInput = this.handleInput.bind(this)
    this.handleCreateRecommendation = this.handleCreateRecommendation.bind(this)
    this.handleUserSelect = this.handleUserSelect.bind(this)
    this.getDigestableUsers = this.getDigestableUsers.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  componentDidMount () {
    if (this.props.authenticated) {
      // get categories from api
      this.props.getRecommendationCategories()
      // get user list from api
      this.props.getUsers(this.props.userId)
      // set from_user id
      this.setState((prevState) => ({
        recommendation: {
          ...prevState.recommendation,
          from_user: this.props.userId
        }
      }))
    }
  }

  getDigestableUsers () {
    return this.props.users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      value: user.id
    }))
  }

  getDigestableCategories () {
    return this.props.categories.map(category => ({
      name: category,
      value: category
    }))
  }

  handleUserSelect ({ value }) {
    this.setState((prevState) => ({
      recommendation: {
        ...prevState.recommendation,
        to_user: value
      }
    }))
  }

  handleInput (e, key) {
    const value = e.target.value
    this.setState((prevState) => ({
      recommendation: {
        ...prevState.recommendation,
        [key]: value
      }
    }))
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
        { !this.props.authenticated
          ? <h2 className='center header__sub'>Please log in to make a recommendation</h2>
          : <div className=''>
            <form className='recommendation'>
              <h2 className='center header__sub'>Make a Recommendation</h2>
              <div className='rec-fields'>
                <label htmlFor='subject'>Subject of recommendation:</label>
                <input id='subject' name='subject' type='text' onChange={(e) => this.handleInput(e, 'subject')} />
              </div>
              <div className='rec-fields'>
                <label htmlFor='category'>Category of recommendation:</label>
                <Dropdown id='category' name='category' options={this.getDigestableCategories()} onChangeHandler={this.handleInput} />
              </div>
              <div className='rec-fields'>
                <label htmlFor='recipient'>Recipient:</label>
                <Dropdown
                  onChangeHandler={this.handleUserSelect}
                  options={this.getDigestableUsers()}
                />
              </div>
              <button className='button-main' onClick={this.validateInput}>Submit Recommendation</button>
            </form>
          </div>
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
    getUsers: bindActionCreators(getUsers, dispatch),
    getRecommendationCategories: bindActionCreators(getRecommendationCategories, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    categories: state.recommendations.categories,
    userId: state.user.user.id,
    users: state.user.users
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Recommend)
