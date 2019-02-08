const router = require('express').Router()

const projectsController = require('../controllers/projects')

router.route('/projects')
  .get(projectsController.index)

module.exports = router
