import React from 'react'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Recommendation from '../components/Recommendation'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import {
  getUsers,
  getResolvedRecommendationsForUser,
  getPendingRecommendationsForUser,
  setShowedAnimation
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
      <Recommendation
        key={rec.public_id}
        public_id={rec.public_id}
        subject={rec.subject}
        result={rec.result} canReact={false} />
    ))

    return (
      <div>
        <div>
          <h2 className='center header__sub'>Pending recommendations</h2>
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
            <h2 className='header__sub'>Past recommendations</h2>
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
      <div className='center header__main'>
        <h1>Welcome To Recommend!</h1>
      </div>
    )
  }

  componentDidMount () {
    // animate header in 2 seconds, animation should last half a second
    setTimeout(() => {
      this.props.setShowedAnimation()
    }, 1500)
  }

  componentWillReceiveProps (props) {
    if (props.authenticated && !props.pendingRecommendations.length) props.getPendingRecommendationsForUser(props.userId)
  }

  render () {
    const header = this.props.authenticated && (
      <h1 key='header' id='header' className={`center header__main ${this.props.showedWelcomeAnimation ? 'fadeOut' : ''}`}>
        <p>Welcome back {this.props.user.user.firstName}!</p>
      </h1>
    )

    const body = this.props.authenticated ? this.userDash() : this.splashPage()

    return (
      <Layout>
        <div id='userDash' className={this.props.showedWelcomeAnimation ? 'slideOut' : ''}>
          {header}
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
    getUsers: bindActionCreators(getUsers, dispatch),
    setShowedAnimation: bindActionCreators(setShowedAnimation, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    userId: state.user.user.id,
    pendingRecommendations: state.user.pendingRecommendations,
    resolvedRecommendations: state.user.resolvedRecommendations,
    showedWelcomeAnimation: state.ui.showedWelcomeAnimation,
    user: state.user
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
