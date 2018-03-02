import React from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Recommendation from '../components/Recommendation'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import {
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
    return (
      <div>
        <h1>Welcome back User!</h1>
        { this.props.pendingRecommendations.map(rec => (
          <Recommendation key={rec.public_id} public_id={rec.public_id} subject={rec.subject} canReact />
        ))}

        { !this.state.showPrevious
          ? <div>
            <p>Or,</p>
            <button onClick={() => this.showPreviousRecommendations()}>see all previous recommendations</button>
          </div>
          : <button onClick={() => this.setState({ showPrevious: false })}>hide previous recommendations</button>}

        { this.state.showPrevious && this.props.resolvedRecommendations.map(rec => (
          <Recommendation key={rec.public_id} public_id={rec.public_id} subject={rec.subject} canReact={false} />
        ))}
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
    getPendingRecommendationsForUser: bindActionCreators(getPendingRecommendationsForUser, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user.user.id,
    pendingRecommendations: state.user.pendingRecommendations,
    resolvedRecommendations: state.user.resolvedRecommendations
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
