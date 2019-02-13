const Package = require('../models/package')
const Promise = require('bluebird')

const rp = require('request-promise')

//Index Route returns a response containing all packages
function indexRoute(req, res, next) {
  Package
    .find()
    .then(packages => res.json(packages))
    .catch(next)
}

function searchRoute(req, res, next){

  var options = {
    uri: `https://api.npms.io/v2/search?q=${req.params.search}`,
    json: true // Automatically parses the JSON string in the response
  }
  rp(options)
    .then( (data) =>{
      res.json(data)
    })
    .catch(next)
}

//Create Route adds a new package to the database and returns it
function createRoute(req, res, next) {
  //Add current user to the body
  Package
    //Add a new project to database
    .create(req.body)
    //Return the new project
    .then(project => res.status(201).json(project))
    .catch(next)
}

//PostCommentRoute finds the package and puts the new comment into the beginning of the array
//returns a response containing the package with the new comment
function postCommentRoute(req, res,  next) {
  Package
    .findOne({name: req.params.name})
    .then(_package => {
      _package.comments.unshift(req.body)
      return _package.save()
    })
    .then( data => res.status(201).json(data) )
    .catch(next)
}

//Show Route finds a package and requests data from the NPMS api.
//When both bits of data are available it combines them and returns the combined data
function showRoute(req, res, next) {
  //Get package name
  const name = req.params.name

  //Set up request promise
  var options = {
    uri: `https://api.npms.io/v2/package/${req.params.name}`,
    json: true // Automatically parses the JSON string in the response
  }

  //Wait for both promises to be completed before continuing
  Promise.props({
    localData: Package
      .findOne({name})
      .populate({
        path: 'comments.user',
        select: 'username image'
      })
    ,
    remoteData: rp(options)
  })
    .then( (data) =>{
      //Add remoteData data as the value for npms in localData
      data.localData.npms = data.remoteData
      res.json(data.localData)
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  search: searchRoute,
  show: showRoute,
  comment: postCommentRoute
}
