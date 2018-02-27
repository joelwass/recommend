import React from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Recommendation from '../components/Recommendation'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getRecommendationsForUser } from '../store/actions'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  userDash () {
    return (
      <div>
        <h1>Welcome back User!</h1>
        { this.props.outstandingRecommendations.map(rec => (
          <Recommendation public_id={rec.public_id} subject={rec.subject} />
        ))}
      </div>
    )
  }

  splashPage () {
    return (
      <div>
        <h1>Welcome to our hot app. Login to experience it</h1>
      </div>
    )
  }

  componentDidMount () {
    this.props.getRecommendationsForUser(this.props.userId)
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
    getRecommendationsForUser: bindActionCreators(getRecommendationsForUser, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user.user.id,
    outstandingRecommendations: state.user.outstandingRecommendations
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
