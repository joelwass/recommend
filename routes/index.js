const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/health', (req, res) => {
  res.status(200).json({ alive: true })
})

// user routes
router.route('/user/:email?')
  .post(controllers.userController.createUser)
  .get(controllers.userController.getUser)
  .put(controllers.userController.updateUser)
  .delete(controllers.userController.deleteUser)

router.get('/users', controllers.userController.getUsers)

// recommendation routes
router.route('/recommendation/:id?')
  .post(controllers.recommendationController.createRecommendation)
  .get(controllers.recommendationController.getRecommendation)
  .put(controllers.recommendationController.updateRecommendation)
  .delete(controllers.recommendationController.deleteRecommendation)

router.get('/recommendation/for/:userId', controllers.recommendationController.getRecommendationsForUser)
router.get('/recommendation/from/:userId', controllers.recommendationController.getRecommendationsFromUser)

module.exports = router
