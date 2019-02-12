const User = require('../models/user')
const jwt = require('jsonwebtoken')

function registerRoute(req, res, next){
  User.create(req.body)
    .then(() => res.status(201).json({ message: `${req.body.username} has been created sucessfully` }))
    .catch(next)
}

function loginRoute(req, res,next) {
  User.findOne({ email: req.body.email })
    .then(email => {
      if(!email || !email.validatePassword(req.body.password)) {
        const error = {
          email: 'Please proved a vailid email address',
          password: 'Incorrect Password'
        }
        return res.status(401).json(error)
      }
      const payload = { sub: email._id }
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '6h' })
      res.json({
        token,
        message: `Welcome back ${email.username}!`
      })
    })
    .catch(next)
}

module.exports = {
  register: registerRoute,
  login: loginRoute
}
