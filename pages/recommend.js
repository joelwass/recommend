import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getRecommendations } from '../store/actions'
import Layout from '../components/Layout'

class Recommend extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recommendation: {
        to_user: undefined,
        from_user: undefined,
        subject: undefined,
        prediction: undefined,
        category: undefined
      },
      isValid: false
    }
  }

  componentDidMount() {
  }

  handleCreateRecommendationInput = (e, key) => {
    this.setState({ details: Object.assign(this.state.recommendation, { [key]: e.target.value }) })
  }

  render() {
    return (
      <Layout>
        <h1>Recommend</h1>
        { !this.props.authenticated ?
          <p>Please log in to make a recommendation</p>
          :
          <div>
            <p>Make a recommendation:</p>
            Username of recipient:
            <input type="text" onChange={ (e) => this.handleCreateRecommendationInput(e, 'to_user') }/><br/>
            Subject of recommendation:
            <input type="text" onChange={ (e) => this.handleCreateRecommendationInput(e, 'subject') }/><br/>
            Prediction of recommendation:
            <input type="text" onChange={ (e) => this.handleCreateRecommendationInput(e, 'prediction') }/><br/>
            Category of recommendation:
            <input type="text" onChange={ (e) => this.handleCreateRecommendationInput(e, 'category') }/><br/>
            <button onClick={this.props.createRecommendation}>Submit Recommendation</button>
          </div>
        }
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRecommendation: bindActionCreators(getRecommendations, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Recommend)
