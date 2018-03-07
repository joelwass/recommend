import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import React from 'react'
import { initStore } from '../store'
import { getRecommendations, getUsers } from '../store/actions'
import Layout from '../components/Layout'
import Recommendation from '../components/Recommendation'

class Explore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    if (props.authenticated && !props.timelineRecommendations.length) {
      // fetch all recommendations
      props.getRecommendations()
    }
  }

  render () {
    return (
      <Layout>
        { !this.props.authenticated
          ? <h2 className='center header__sub'>Please log in to view recommendations</h2>
          : (
            <div>
              <h1 className='center header__sub'>Explore recent recommendations made by your friends </h1>
              { this.props.timelineRecommendations.map((rec) => (
                <Recommendation public_id={rec.public_id} subject={rec.subject} result={rec.result} canReact={false} key={rec.public_id} />
              ))}
            </div>
          )
        }
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendations: bindActionCreators(getRecommendations, dispatch),
    getUsers: bindActionCreators(getUsers, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    timelineRecommendations: state.recommendations.timelineRecommendations,
    user: state.user
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Explore)
