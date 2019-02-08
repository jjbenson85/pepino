const router = require('express').Router()

// const secureRoute = require('../lib/secureRoute')
// const authController = require('../controllers/auth')
// const usersController = require('../controllers/users')
const projectsController = require('../controllers/projects')
const packagesController = require('../controllers/packages')

// router.post('/register', authController.register)
// router.post('/login', authController.login)

// router.route('/users')
//   .get(usersController.index)
//   .post(secureRoute, usersController.create)

// router.route('/users/:id')
//   .get(usersController.show)
//   .put(secureRoute, usersController.update)
//   .delete(secureRoute, usersController.delete)

router.route('/projects')
  .get(projectsController.index)
  .post(projectsController.create)

// router.route('/projects/:id')
//   .get(projectsController.show)
//   .put(secureRoute, projectsController.update)
//   .delete(secureRoute, projectsController.delete)

router.route('/packages')
  .get(packagesController.index)
  // .post(secureRoute, packagesController.create)

// router.route('/packages/:id')
//   .get(packagesController.show)
// .put(secureRoute, packagesController.update)
// .delete(secureRoute, packagesController.delete)

// router.post('/packages/:id/comments', secureRoute, packagesController.commentCreate)
// router.delete('/packages/:id/comments/:commentId', secureRoute, packagesController.commentDelete)

router.all('/*', (req, res) => res.sendStatus(404))

module.exports = router
