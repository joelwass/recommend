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
    ],
    hooks: {
      beforeCreate : (user, options) => {
        return bcrypt.hash(user.password, 10)
          .then(encryptedPassword => {
            user.password = encryptedPassword
          })
          .catch(err => {
            console.log(err)
          })
      },
      beforeUpdate: (user, options) => {
        if (!user.changed('password')) {
          return
        }

        return bcrypt.hash(user.password, 10)
          .then(encryptedPassword => {
            user.password = encryptedPassword
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  })

  return User
}
