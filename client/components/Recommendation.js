import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateRecommendation, deleteRecommendation } from '../store/actions'

const Recommendation = (props) => (
  <div>
    {props.public_id && props.subject &&
      <div class='recommendation_card'>
        {props.subject}

        {props.canReact &&
        <div class='recommendation_card__action'>
          <button class='like' onClick={() => props.updateRecommendation({ public_id: props.public_id, result: true })}>
            I like
          </button>
          <button class='no_like' onClick={() => props.updateRecommendation({ public_id: props.public_id, result: false })}>
            I don't like
          </button>
          <button class='ignore' onClick={() => props.deleteRecommendation(props.public_id)}>
            Ignore
          </button>
        </div>}
      </div>}
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    updateRecommendation: bindActionCreators(updateRecommendation, dispatch),
    deleteRecommendation: bindActionCreators(deleteRecommendation, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation)
