import React from 'react'
import { connect } from 'react-redux'

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

export default connect(mapStateToProps, mapDispatchToProps)(ValidationContainer)
