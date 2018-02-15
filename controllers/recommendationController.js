const pluck = require('object-pluck')
const ulid = require('ulid').ulid
const sqlModels = require('../models')
const helper = require('../helper')

module.exports = {
  createRecommendation: (req, res) => {
    // validate params, required: [subject, prediction, to_user, from_user]
    const params = pluck(['subject', 'prediction', 'to_user', 'from_user'], req.body).end()
    if (Object.keys(params).length !== 4) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    // validate that the from user exists
    sqlModels.User.findOne({ where: { id: params.from_user }})
      .then(user => {
        if (!user) return res.status(200).json({ success: false, message: helper.strings.noFromUserByThatId })

        // now find the to user and make sure it exists
        return sqlModels.User.findOne({ where: { id: params.to_user }})
      })
      .then(user => {
        if (!user) return res.status(200).json({ success: false, message: helper.strings.noToUserByThatId })

        // create a ulid for the recommendation
        const recommendationUlid = ulid()
        params.public_id = recommendationUlid

        // create the recommendation
        return sqlModels.Recommendation.create(params)
      })
      .then(recommendation => {
        return res.status(200).json({ success: true, message: helper.strings.recommendationCreatedSuccesfully, recommendation: recommendation.toJSON() })
      })
      .catch(err => {
        res.status(500).json({ success: false, message: helper.strings.anErrorHappened, error: err.message })
      })
  },
  updateRecommendation: (req, res) => {
    // validate params, need an id for the recommendation
    const params = pluck(['id'], req.params).end()
  },
  getRecommendation: (req, res) => {

  },
  deleteRecommendation: (req, res) => {

  },
  getRecommendationsForUser: (req, res) => {

  }
}
