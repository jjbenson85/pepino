const mongoose = require('mongoose')
// const User = require('../models/user')

//Add comments as feature later
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: { type: String, required: true }
},{
  timeStamps: true
})

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String },
  version: {type: String},
  keywords: [{ type: String}],
  downloadsCount: { type: Number},
  comments: [commentSchema]
})



// packageSchema.set('toJSON', {
//   virtuals: true,
//   transform(doc, json) {
//     delete json.__v
//     return json
//   }
// })

module.exports = mongoose.model('Package', packageSchema)
