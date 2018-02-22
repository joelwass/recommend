const pluck = require('object-pluck')
const ulid = require('ulid').ulid
const sqlModels = require('../models')
const helper = require('../helper')
const constants = require('../helper/constants')

module.exports = {
  createRecommendation: (req, res) => {
    // validate params, required: [subject, prediction, to_user]
    const params = pluck(['subject', 'prediction', 'to_user', 'from_user', 'category'], req.body).end()
    if (Object.keys(params).length !== 5) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    // validate that the from user exists and is the same as the from_user
    sqlModels.User.findOne({ where: { id: req.currentUserId } })
      .then(user => {
        if (!user || user.id !== params.from_user) throw new helper.CustomError(helper.strings.noFromUserByThatId)

        // now find the to user and make sure it exists
        return sqlModels.User.findOne({ where: { id: params.to_user } })
      })
      .then(user => {
        if (!user) throw new helper.CustomError(helper.strings.noToUserByThatId)

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
        helper.methods.handleErrors(err, res)
      })
  },
  updateRecommendation: (req, res) => {
    // validate params, need an id for the recommendation
    const params = pluck(['public_id', 'result'], req.body).end()
    if (Object.keys(params).length !== 2) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    sqlModels.Recommendation.findOne({ where: { public_id: params.public_id } })
      .then(recommendation => {
        if (!recommendation) {
          throw new helper.CustomError(helper.strings.noRecommendationForThatId)
        }

        recommendation.result = params.result
        recommendation.status = 'resolved'

        return recommendation.save()
      })
      .then(updatedRecommendation => {
        return res.status(200).json({ success: true, message: helper.strings.recommendationUpdatedSuccesfully, recommendation: updatedRecommendation.toJSON() })
      })
      .catch(err => {
        helper.methods.handleErrors(err, res)
      })
  },
  getRecommendation: (req, res) => {
    // validate params, required id to get recommendation for
    const params = pluck(['id'], req.params).end()
    if (!params.id) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    sqlModels.Recommendation.findOne({ where: { public_id: params.id } })
      .then(localRecommendation => {
        if (!localRecommendation) throw new helper.CustomError(helper.strings.noRecommendationForThatId)
        return res.status(200).json({ success: true, recommendation: localRecommendation.toJSON() })
      })
      .catch(err => {
        helper.methods.handleErrors(err, res)
      })
  },
  getRecommendationCategories: (req, res) => {
    return res.status(200).json({ success: true, categories: constants.RECOMMENDATION_CATEGORIES })
  },
  getAllRecommendations: (req, res) => {
    sqlModels.Recommendation.findAll()
      .then(localRecommendations => {
        if (!localRecommendations) throw new helper.CustomError(helper.strings.noRecommendationsReturned)
        return res.status(200).json({ success: true, recommendations: localRecommendations })
      })
      .catch(err => {
        helper.methods.handleErrors(err, res)
      })
  },
  deleteRecommendation: (req, res) => {
    // validate params, required id to delete recommendation
    const params = pluck(['id'], req.params).end()
    if (!params.id) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    sqlModels.Recommendation.findOne({ where: { id: params.id } })
      .then(localRecommendation => {
        if (!localRecommendation) throw new helper.CustomError(helper.strings.noRecommendationForThatId)
        return localRecommendation.destroy()
      })
      .then(() => {
        return res.status(200).json({ success: true, message: helper.strings.recommendationSuccesfullyDeleted })
      })
      .catch(err => {
        helper.methods.handleErrors(err, res)
      })
  },
  getRecommendationsForUser: (req, res) => {
    // validate params, required id to get recommendations for
    const params = pluck(['userId'], req.params).end()
    if (!params.userId) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    sqlModels.Recommendation.findAll({ where: { to_user: params.userId } })
      .then(localRecommendations => {
        if (!localRecommendations.length) throw new helper.CustomError(helper.strings.noRecommendationForThatUserId)
        return res.status(200).json({ success: true, recommendations: localRecommendations })
      })
      .catch(err => {
        helper.methods.handleErrors(err, res)
      })
  },
  getRecommendationsFromUser: (req, res) => {
    // validate params, required id to get recommendations from
    const params = pluck(['userId'], req.params).end()
    if (!params.userId) return res.status(200).json({ success: false, message: helper.strings.invalidParameters })

    sqlModels.Recommendation.findAll({ where: { from_user: params.userId } })
      .then(localRecommendations => {
        if (!localRecommendations.length) throw new helper.CustomError(helper.strings.noRecommendationFromThatUserId)
        return res.status(200).json({ success: true, recommendations: localRecommendations })
      })
      .catch(err => {
        helper.methods.handleErrors(err, res)
      })
  }
}
