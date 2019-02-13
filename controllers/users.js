const User = require('../models/user')

//Index Route returns a response containing all users
function indexRoute(req, res) {
  User
    .find()
    .then(users => res.status(200).json(users))
}

//Show Route returns a response containing one user and populates the project but does not return the project comments
function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({path: ' project', select: '-comments'})
    .then(projects => res.status(200).json(projects))
    .catch(next)
}

//Update Route finds a user by id and updates it, returning the updated user
function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.status(200).json(user))
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
  delete: deleteRoute
}
