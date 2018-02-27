import React from 'react'
import { connect } from 'react-redux'

const Recommendation = (props) => (
  <div>
    {props.public_id && props.subject &&
      <div class='recommendation_card' id={props.public_id}>
        {props.subject}

        {props.canReact &&
        <div class='recommendation_card__action'>
          <button class='like'>
            I like
          </button>
          <button class='no_like'>
            I don't like
          </button>
          <button class='ignore'>
            Ignore
          </button>
        </div>}
      </div>}
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation)
