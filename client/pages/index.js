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
      <div>
        <div className='center header__main'>
          <h1>Welcome To Recommend!</h1>
        </div>
        <div className='center'>
          <p className='splash'>Recommend is an application built with the desire to remove user bias when receiving recommendations.</p>
          <p className='splash'>We live in a world built by <a href='https://tinyurl.com/y82zs8k3'>echo chambers</a>. Through simple human nature, we tend to surround ourselves with like minded people. You get your recommended food from chefs you've historically enjoyed. You get your book recommendations from friends who like similar books. That all makes sense, but does it increase the breadth of your experiences? Do you gain insight into the <a href='https://tinyurl.com/ybnzwobw'>other side</a>? Or are you reinforcing your prior conceived opinions? Are you pigeon-holing yourself?</p>
          <p className='splash'>As <a href='https://tinyurl.com/387qha'>Jonathan Gardner</a> wrote, "We can't write off the danger of complacency, growing rigidity, imprisonment by our own comfortable habits and opinions".</p>
          <p className='splash'>And he's right. So we built Recommend. You now can get (and give) anonymized recommendations meant to expand your mind without introducing prior recommender bias. If a Trump supporter loves a book, but you know they're a Trump supporter and you're a diehard democrat, will you read the book? Probably not, regardless if you'd like the book in the end.</p>
          <p className='splash'>Complete your recommendations and gain points, give well received recommendations and gain badges. Maybe one day you'll be a certified Recommender. Follow users you think will give good recommendations, or just test your friendships by recommending what you think they'd like and seeing how they do.</p>
        </div>
      </div>
    )
  }

  componentDidMount () {
    // animate header in 2 seconds, animation should last half a second
    if (this.props.authenticated) {
      setTimeout(() => {
        this.props.setShowedAnimation()
      }, 1500)
    }
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
