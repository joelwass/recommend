// const orm = require('@npm/spife/db/orm')
// const joi = require('@npm/spife/joi')
// const ULID = require('ulid')

// const User = require('./user')

// function Recommendation (opts) {
//   Object.assign(this, {
//     id: opts.id,
//     public_id: opts.public_id,
//     subject: opts.subject,
//     prediction: opts.prediction,
//     result: opts.result,
//     to_user: opts.to_user,
//     from_user: opts.from_user,
//     status: opts.status,
//     created: opts.created,
//     updated: opts.updated
//   })
// }

// Recommendation.objects = orm(Recommendation, {
//   id: joi.number().integer().greater(0).required(),
//   public_id: joi.string().default(() => ULID.ulid(), 'ulid').required(),
//   subject: joi.string().required(),
//   prediction: joi.boolean().required(),
//   result: joi.boolean(),
//   to_user: orm.fk(User),
//   from_user: orm.fk(User),
//   status: joi.any().only([
//     'pending',
//     'resolved'
//   ]).default('pending'),
//   created: joi.date().default(() => new Date(), 'current date')
// })

// module.exports = Recommendation
