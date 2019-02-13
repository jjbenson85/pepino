const User = require('../models/user')
const jwt = require('jsonwebtoken')

function registerRoute(req, res, next){
  User.create(req.body)
    .then(() => res.status(201).json({ message: `${req.body.username} has been created sucessfully` }))
    .catch(next)
}

function loginRoute(req, res,next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        const error = {
          user: 'Please proved a vailid user address',
          password: 'Incorrect Password'
        }
        return res.status(401).json(error)
      }
      const payload = { sub: user._id }
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '6h' })
      res.json({
        _id: user._id,
        token,
        message: `Welcome back ${user.username}!`
      })
    })
    .catch(next)
}

module.exports = {
  register: registerRoute,
  login: loginRoute
}
