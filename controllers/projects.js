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

function showRoute(req, res, next) {
  Project
    .findById(req.params.id)
    // .populate([
    //   { path: 'user', select: 'name' },
    //   { path: 'packages', select: 'name' }
    // ])
    .then(projects => res.json(projects))
    .catch(next)
}

function createRoute(req, res, next) {
  Project
    .create(req.body)
    .then(project => res.status(201).json(project))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute
}
