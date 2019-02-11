const Package = require('../models/package')

const rp = require('request-promise')

function indexRoute(req, res) {
  Package
    .find()
    .then(packages => res.json(packages))
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
  show: showRoute
}
