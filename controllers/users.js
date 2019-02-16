const User = require('../models/user')

function indexRoute(req, res, next) {
  User
    .find()
    .populate({path: ' project'})
    .then(users => res.json(users))
    .catch(next)
}

function searchRoute(req, res, next ) {
  User
    .find({'username': new RegExp(req.params.search, 'i')})
    .populate('project')
    .then(users => res.json(users))
    .catch(next)
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({path: ' project', select: '-comments'})
    .then(user => res.json(user))
    .catch(next)
}

//Update Route finds a user by id and updates it, returning the updated user
function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.status(201).json(user))
    .catch(next)
}

//Delete Route finds a user by id and removes it from the database. Returns a success status and empty body.
function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  search: searchRoute
}
