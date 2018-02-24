const constants = require('../helper/constants')

module.exports = (sequelize, DataTypes) => {
  const Recomendation = sequelize.define('Recommendation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.STRING, // ulid
      required: true
    },
    subject: {
      type: DataTypes.STRING,
      required: true
    },
    prediction: {
      type: DataTypes.BOOLEAN,
      required: true
    },
    result: {
      type: DataTypes.BOOLEAN
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        isIn: [constants.RECOMMENDATION_CATEGORIES]
      },
      required: true
    },
    to_user: {
      type: DataTypes.INTEGER,
      required: true
    },
    from_user: {
      type: DataTypes.INTEGER,
      required: true
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: [constants.RECOMMENDATION_STATUS_TYPES]
      },
      defaultValue: 'pending'
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
      afterUpdate: (recommendation, options) => {
        // figure out of the recommendation was correct or not
        const correctRecommendation = recommendation.prediction === recommendation.result
        // find the to_user and update the to_users recommendationsReceivedCorrect field and the from_users recomendation correct field
        sequelize.models.User.findOne({ where: { id: recommendation.to_user } })
          .then(user => {
            if (correctRecommendation) user.recommendationsReceivedCorrect++
            return user.save()
          })
          .then(() => sequelize.models.User.findOne({ where: { id: recommendation.from_user } }))
          .then(user => {
            if (correctRecommendation) user.recommendationsGivenCorrect++
            return user.save()
          })
          .catch(err => {
            return Promise.reject(err)
          })
      },
      beforeCreate: (recommendation, options) => {
        // update the from_users recommendations_given field and the to_users recommendations received field
        sequelize.models.User.findOne({ where: { id: recommendation.to_user } })
          .then(user => {
            user.recommendationsReceived++
            return user.save()
          })
          .then(() => sequelize.models.User.findOne({ where: { id: recommendation.from_user } }))
          .then(user => {
            user.recommendationsGiven++
            return user.save()
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }
    }
  })

  return Recomendation
}
