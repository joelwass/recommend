import React from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Recommendation from '../components/Recommendation'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import {
  getUsers,
  getResolvedRecommendationsForUser,
  getPendingRecommendationsForUser
} from '../store/actions'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPrevious: false
    }

    this.showPreviousRecommendations = this.showPreviousRecommendations.bind(this)
  }

  showPreviousRecommendations () {
    this.setState({ showPrevious: true })
    this.props.getResolvedRecommendationsForUser(this.props.userId)
  }

  userDash () {
    const previousRecommendations = this.props.resolvedRecommendations.map(rec => (
      <Recommendation key={rec.public_id} public_id={rec.public_id} subject={rec.subject} canReact={false} />
    ))

    return (
      <div>
        <h1>Welcome back {this.props.user.user.firstName}!</h1>
        <div>
          <h2 className='center'>Pending recommendations</h2>
          { this.props.pendingRecommendations.map(rec => (
            <Recommendation key={rec.public_id} public_id={rec.public_id} subject={rec.subject} canReact />
          ))}
        </div>

        { !this.state.showPrevious &&
          <div className='center'>
            <button className='button-main' onClick={() => this.showPreviousRecommendations()}>See All Previous Recommendations</button>
          </div>
        }

        { this.state.showPrevious && (
          <div className='center'>
            <h2 className='center'>Past recommendations</h2>
            {previousRecommendations}
            <button className='button-main' onClick={() => this.setState({ showPrevious: false })}>Hide Previous Recommendations</button>
          </div>
          )
        }
      </div>
    )
  }

  splashPage () {
    return (
      <div className='header-main'>
        <h1>Welcome To Recommend!</h1>
      </div>
    )
  }

  componentDidMount () {
    this.props.getPendingRecommendationsForUser(this.props.userId)
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
  return {
    getResolvedRecommendationsForUser: bindActionCreators(getResolvedRecommendationsForUser, dispatch),
    getPendingRecommendationsForUser: bindActionCreators(getPendingRecommendationsForUser, dispatch),
    getUsers: bindActionCreators(getUsers, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user.user.id,
    pendingRecommendations: state.user.pendingRecommendations,
    resolvedRecommendations: state.user.resolvedRecommendations,
    user: state.user
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
