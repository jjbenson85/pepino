const User = require('../models/user')

function indexRoute(req, res) {
  User
    .find()
    .then(users => res.json(users))
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({path: ' project', select: '-comments'})
    .then(projects => res.json(projects))
    .catch(next)
}


module.exports = {
  index: indexRoute,
  show: showRoute
}
