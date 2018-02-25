import React from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

class Loader extends React.Component {
  render () {
    const loader = this.props.loading && (
      <div id='loader-wrapper'>
        <div id='loader' />
      </div>
    )
    return (
      <CSSTransitionGroup
        transitionName='loader'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {loader}
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ui.loading
  }
}

export default connect(mapStateToProps, null)(Loader)
