import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getRecommendations } from '../store/actions'
import Layout from '../components/Layout'

default class Explore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // fetch all recommendations
  }

  render() {
    return (
      <Layout>
        <h1>Explore</h1>
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
    authenticated: state.user.authenticated
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Explore)
