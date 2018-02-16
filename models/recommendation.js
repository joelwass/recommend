const sqlModels = require('../models')

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
        isIn: [['pending', 'resolved']]
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
    }
  })

  return Recomendation
}
