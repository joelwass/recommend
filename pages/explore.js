import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import React from 'react'
import { initStore } from '../store'
import { getRecommendations } from '../store/actions'
import Layout from '../components/Layout'

class Explore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    // fetch all recommendations
    this.props.getRecommendations()
  }

  render () {
    return (
      <Layout>
        <h1>Explore</h1>
        { !this.props.authenticated &&
          <p>Please log in to view recommendations</p>
        }
        <div>
          { this.props.timelineRecommendations && this.props.timelineRecommendations.map(rec => (
            <div key={rec.public_id}>{ rec.subject} </div>
          ))}
        </div>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendations: bindActionCreators(getRecommendations, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    timelineRecommendations: state.recommendations.timelineRecommendations
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Explore)
