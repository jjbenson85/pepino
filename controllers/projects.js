const Project = require('../models/project')

//Index Route returns a response containing all projects (not limited by user)
function indexRoute(req, res) {
  Project
    .find()
    .populate({path: 'user', select: 'username'})
    .then(projects => res.status(200).json(projects))
}

function searchRoute(req, res, next) {
  Project
    .find({'name': new RegExp(req.params.search, 'i')})
    .then(projects => res.status(200).json(projects))
    .catch(next)
}

//Show Route returns a response containing one project and populates the user and pacakges it contains
function showRoute(req, res, next) {
  Project
    .findById(req.params.id)
    //Make user available to front end
    .populate('user')
    //Make packages available to front end
    // .populate('packages')
    .populate([{
      path: 'comments.user',
      select: 'username image'
    },{
      path: 'packages'
    }])
    .then(projects => res.status(200).json(projects))
    .catch(next)
}

//Create Route adds a new project to the database and returns it (does not popualate any referenced values)
function createRoute(req, res, next) {
  //Add current user to the body
  req.body.user = req.currentUser
  Project
    //Add a new project to database
    .create(req.body)
    //Return the new project
    .then(project => res.status(201).json(project))
    .catch(next)
}

//Update Route finds a project by id and updates it, returning the updated project
function updateRoute(req, res, next) {
  Project
    .findById(req.params.id)
    .then(project => project.set(req.body))
    .then(project => project.save())
    .then(project => res.status(201).json(project))
    .catch(next)
}

//Delete Route finds a project by id and removes it from the database. Returns a success status and empty body.
function deleteRoute(req, res, next) {
  Project
    .findById(req.params.id)
    .then(project => project.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

function postCommentRoute(req, res,  next) {
  Project
    .findById(req.params.id)
    .then(project => {
      project.comments.unshift(req.body)
      return project.save()
    })
    .then( data => res.status(201).json(data) )
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  search: searchRoute,
  comment: postCommentRoute
}
