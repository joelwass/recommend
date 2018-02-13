const Sequelize = require('sequelize')

function User (sequelize) {
  return sequelize.define('user', {
    id: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    birthday: Sequelize.DATE,
    recommendationsGiven: {
      type: Sequelize.INTEGER,
      field: 'recommendations_given'
    },
    recommendationsReceived: {
      type: Sequelize.INTEGER,
      field: 'recommendations_received'
    },
    recommendationsGivenCorrect: {
      type: Sequelize.INTEGER,
      field: 'recommendations_given_correct'
    },
    recommendationsReceivedCorrect: {
      type: Sequelize.INTEGER,
      field: 'recommendations_received_correct'
    },
    created: Sequelize.DATE
  }, {
    freezeTableName: true
  })
}

module.exports = User
