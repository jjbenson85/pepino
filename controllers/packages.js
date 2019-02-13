const Package = require('../models/package')

const rp = require('request-promise')

function indexRoute(req, res, next) {
  Package
    .find()
    .then(packages => res.json(packages))
    .catch(next)
}
function postCommentRoute(req, res,  next) {
  console.log('postCommentRoute', req.params.name)
  Package
    // .findOneAndUpdate({name: req.params.name}, {comment: {text: req.body.text}} )
    .findOne({name: req.params.name})
    .then(_package => {
      console.log('_package', _package)
      _package.comments.unshift(req.body)
      // _package.set(req.body)
      return _package.save()
    })
    // .then(_package => _package.save())
    .then( data => res.status(201).json(data) )
    .catch(next)

}
function showRoute(req, res) {
  const name = req.params.name
  var options = {
    uri: `https://api.npms.io/v2/package/${req.params.name}`,
    json: true // Automatically parses the JSON string in the response
  }
  //
  rp(options)
    .then((data)=>{
      Package
        .findOne({name})
        .populate({
          path: 'comments.user',
          select: 'username image'
        })
        .then(_package => {
          res.json({npms: data, pepino: _package})
        })
    })
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  comment: postCommentRoute
}
