const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/health', (req, res) => {
  res.status(200).json({ alive: true })
})

router.route('/user/:email?')
  .post(controllers.userController.createUser)
  .get(controllers.userController.getUser)
  .put(controllers.userController.updateUser)

router.get('/users', controllers.userController.getUsers)

module.exports = router
