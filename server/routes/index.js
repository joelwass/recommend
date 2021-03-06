const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

// health
router.get('/health', (req, res) => res.status(200).json({ alive: true }))

// auth
router.post('/user/login', controllers.authController.loginUser)
router.post('/user/logout', controllers.authController.logoutUser)
router.post('/user/resume', controllers.authController.authenticateSessionId, controllers.authController.resume)

// user routes
router.route('/user/:email?')
  .post(controllers.userController.createUser)
  .get(controllers.authController.authenticateSessionId, controllers.userController.getUser)
  .put(controllers.authController.authenticateSessionId, controllers.userController.updateUser)
  .delete(controllers.authController.authenticateSessionId, controllers.userController.deleteUser)

router.get('/users', controllers.authController.authenticateSessionId, controllers.userController.getUsers)

// recommendation routes
router.get('/recommendation/all', controllers.authController.authenticateSessionId, controllers.recommendationController.getAllRecommendations)
router.get('/recommendation/categories', controllers.authController.authenticateSessionId, controllers.recommendationController.getRecommendationCategories)

router.route('/recommendation/:id?')
  .post(controllers.authController.authenticateSessionId, controllers.recommendationController.createRecommendation)
  .get(controllers.authController.authenticateSessionId, controllers.recommendationController.getRecommendation)
  .put(controllers.authController.authenticateSessionId, controllers.recommendationController.updateRecommendation)
  .delete(controllers.authController.authenticateSessionId, controllers.recommendationController.deleteRecommendation)

router.get('/recommendation/for/:userId/:status', controllers.authController.authenticateSessionId, controllers.recommendationController.getRecommendationsForUser)
router.get('/recommendation/from/:userId/:status', controllers.authController.authenticateSessionId, controllers.recommendationController.getRecommendationsFromUser)

module.exports = router
