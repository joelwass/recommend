import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getRecommendations } from '../store/actions'
import Layout from '../components/Layout'

class Explore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // fetch all recommendations
    this.props.getRecommendations()
  }

  render() {
    return (
      <Layout>
        <h1>Explore</h1>
        <div>
          { this.props.timelineRecommendations && this.props.timelineRecommendations.map(rec => (
            <div>{ rec.subject} </div>
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
