const mongoose = require('mongoose')

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
  packages: { type: mongoose.Schema.ObjectId, ref: 'Package'},
  public: { type: Boolean, required: true, default: true},
  comments: [ commentSchema ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)
