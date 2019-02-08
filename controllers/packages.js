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
      // console.log(data)
      Package
        .find({name})
        .then(_package => {
          const showPackage = {
            pepino: {_package},
            npms: {data}

          }
          res.json(showPackage)
        })
    })
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
