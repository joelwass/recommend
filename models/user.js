const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    firstName: {
      type: DataTypes.STRING,
      required: true
    },
    lastName: {
      type: DataTypes.STRING,
      required: true
    },
    birthday: {
      type: DataTypes.DATE
    },
    recommendationsGiven: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    recommendationsReceived: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    recommendationsGivenCorrect: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    recommendationsReceivedCorrect: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    meta: {
      type: DataTypes.JSON
    }
  }, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  })

  User.beforeCreate( (user, options, next) => {
    bcrypt.hash(user.password, 10,  function (err, encryptedPassword) {
      if (err) return next(err)
      user.password = encryptedPassword
      return next()
    })
  })

  User.beforeUpdate( (user, options, next) => {

    if (!user.changed('password')) {
      return next()
    }

    bcrypt.hash(user.password, 10, function (err, encryptedPassword) {
      if (err) return next(err)
      user.password = encryptedPassword
      next()
    })
  })

  return User
}
