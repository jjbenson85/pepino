const Package = require('../models/package')

function indexRoute(req, res) {
  Package
    .find()
    //Populate referenced properties
    // .populate([{
    //   path: 'author',
    //   select: 'name'
    // },{
    //   path: 'series',
    //   select: 'name'
    // }])
    .then(packages => res.json(packages))
}

module.exports = {
  index: indexRoute
  // show: showRoute
}
