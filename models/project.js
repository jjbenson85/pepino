const mongoose = require('mongoose')

const User = require('../models/user')
const Package = require('../models/package')

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  text: { type: String, required: true, maxlength: 250 }
}, {
  timestamps: true
})

const projectSchema = new mongoose.Schema({
  name: { type: String, required: 'You must provide a project name' },
  description: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  packages: [{ type: mongoose.Schema.ObjectId, ref: 'Package'}],
  public: { type: Boolean, required: true, default: true},
  comments: [ commentSchema ]
}, {
  timestamps: true
})


projectSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('Project', projectSchema)
