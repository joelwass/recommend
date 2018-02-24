import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookie from 'js-cookie'
import { SESSION_COOKIE } from '../helper/constants'
import { resume } from '../store/actions'
import Header from './Header'
import ValidationContainer from './ValidationContainer'
import '../styles/main.scss'

class Layout extends React.Component {
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
        <Header />
        <ValidationContainer />
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resume: bindActionCreators(resume, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
