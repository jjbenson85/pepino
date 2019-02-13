const User = require('../models/user')

function indexRoute(req, res, next) {
  User
    .find()
    .then(users => res.json(users))
    .catch(next)
}


function searchRoute(req, res, next) {
  console.log(req.body)
  User
    .find({'username': new RegExp('', 'i')})
    .then(user => res.json(user))
    .catch(next)
}


function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({path: ' project', select: '-comments'})
    .then(user => res.json(user))
    .catch(next)
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  search: searchRoute
}
