const sqlModels = require('../models')
const pluck = require('object-pluck')
const helper = require('../helper')

module.exports = {
  createUser: (req, res) => {
    // validate params
    const params = pluck(['email', 'password', 'firstName', 'lastName', 'birthday'], req.body).end()
    if (params.length != 5) return res.status(500).json({ success: false, message: helper.strings.invalidParameters })

    // validate password length
    if (params.password.length < 5) return res.status(500).json({ success: false, message: helper.strings.invalidPasswordParameter })

    return sqlModels.User.findOrCreate({ where: { email: params.email }, defaults: params })
      .then(result => {
        const didCreateNewUser = result[1]
        const user = result[0]
        // if the user wasn't created new, this will return the old, found user with matching email address
        if (!didCreateNewUser) return res.status(200).json({ success: false, message: helper.strings.userAlreadyExists, user: user })
        else return res.status(200).json({ success: true, message: helper.strings.userCreatedSuccesfully, user: user })
      })
      .catch(e => {
        return res.status(500).json({ success: false, message: helper.strings.anErrorHappened })
      })
  },
  updateUser: (req, res) => {

  },
  getUsers: (req, res) => {

  },
  getUser: (req, res) => {

  }
}
