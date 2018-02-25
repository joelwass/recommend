import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import Cookie from 'js-cookie'
import { SESSION_COOKIE } from '../helper/constants'
import { resume, setLoading } from '../store/actions'
import Header from './Header'
import Loader from './Loader'
import ValidationContainer from './ValidationContainer'
import '../styles/main.scss'

class Layout extends React.Component {
  constructor (props) {
    super(props)

    // set up loading events for route changes
    Router.onRouteChangeStart = () => this.props.setLoading(true)
    Router.onRouteChangeComplete = () => this.props.setLoading(false)
    Router.onRouteChangeError = () => this.props.setLoading(false)
  }
  componentWillMount () {
    if (!this.props.authenticated) {
      // check to see if there is a session cookie
      const session = Cookie.get(SESSION_COOKIE)
      if (session) {
        this.props.resume(session)
      }
    }
  }

  render () {
    return (
      <div className='main'>
        <Loader />
        <Header />
        <ValidationContainer />
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: bindActionCreators(setLoading, dispatch),
    resume: bindActionCreators(resume, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
