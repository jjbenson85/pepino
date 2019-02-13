const Project = require('../models/project')

function indexRoute(req, res) {
  Project
    .find()
    .then(projects => res.json(projects))
}

function showRoute(req, res, next) {
  Project
    .findById(req.params.id)
    .populate('user')
    .populate('packages')
    .then(projects => res.json(projects))
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser
  Project
    .create(req.body)
    .then(project => res.status(201).json(project))
    .catch(next)
}

function updateRoute(req, res, next) {
  Project
    .findById(req.params.id)
    .then(project => project.set(req.body))
    .then(project => project.save())
    .then(project => res.json(project))
    .catch(next)
}

function deleteRoute(req, res, next) {
  console.log(req.params.id)
  Project
    .findById(req.params.id)
    .then(project => project.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
}
