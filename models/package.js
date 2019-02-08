const mongoose = require('mongoose')

//Add comments as feature later
// const commentSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   user: { type: mongoose.Schema.ObjectId, ref: 'Author', required: true }
// })

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  keywords: [{ type: String}],
  downloads: { type: Number}
  // comments: [commentSchema]
})


packageSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('Package', packageSchema)
