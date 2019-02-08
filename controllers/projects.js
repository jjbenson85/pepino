const Project = require('../models/project')

function indexRoute(req, res) {
  Project
    .find()
    .populate([
      { path: 'user', select: 'name' },
      { path: 'packages', select: 'name' }
    ])
    .then(projects => res.json(projects))
}

module.exports = {
  index: indexRoute
}
