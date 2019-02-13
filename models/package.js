const mongoose = require('mongoose')

//Comment Schema for commenting on packages
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
  //Package comments embedded model
  comments: [commentSchema],
  //NPMS is data returned from NPMS API used for package show
  npms: { type: Object}
})

//Remove __v tag when returning JSON
packageSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('Package', packageSchema)
