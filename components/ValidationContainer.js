import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

const ValidationContainer = (props) => (
  <div>
    {props.errorMessage &&
      <div id="errorMessage">{props.errorMessage}</div>}
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.ui.errorMessage
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ValidationContainer)
