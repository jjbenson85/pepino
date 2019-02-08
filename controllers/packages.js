const Package = require('../models/package')

const rp = require('request-promise')

function indexRoute(req, res) {
  Package
    .find()
    .then(packages => res.json(packages))
}
function showRoute(req, res) {
  console.log('name',req.params.name)
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
          //Populate the name of the series
          // populate: {
          //   path: 'user',
          //   select: 'name'
          // }
        })
        .then(_package => {
          console.log(_package)
          const newData = {...data, commments: _package.comments}
          res.json(newData)
          // const showPackage = {
          //   pepino: _package[0],
          //   npms: data
          //
          // }
          // res.json(showPackage)
        })
    })
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
