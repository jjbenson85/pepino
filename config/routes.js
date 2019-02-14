const router = require('express').Router()

const secureRoute = require('../lib/secureRoute')
const authController = require('../controllers/auth')
const usersController = require('../controllers/users')
const projectsController = require('../controllers/projects')
const packagesController = require('../controllers/packages')

//*** AUTH ROUTES **//
router.post('/register', authController.register)
router.post('/login', authController.login)


//*** USER ROUTES **//
router.route('/users')
  .get(usersController.index)

router.route('/users/search/:search')
  .get(usersController.search)

router.route('/users/:id')
  .get(usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete)



//*** PROJECT ROUTES **//
router.route('/projects')
  .get(projectsController.index)
  .post(secureRoute, projectsController.create)

router.route('/projects/:id/comments')
  .post(projectsController.comment)

router.route('/projects/:id')
  .get(projectsController.show)
  .put(secureRoute, projectsController.update)
  .delete(secureRoute, projectsController.delete)

router.route('/projects/search/:search')
  .get(projectsController.search)


//*** PACKAGE ROUTES **//
router.route('/packages')
  .get(packagesController.index)

router.route('/packages/search/:search')
  .get(packagesController.search)

router.route('/packages/multi')
  .post(packagesController.multi)
  // .post(packagesController.create)

router.route('/packages/:name')
  .get(packagesController.show)
  .post(packagesController.comment)



router.all('/*', (req, res) => res.sendStatus(404))

module.exports = router
