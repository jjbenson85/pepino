/* global api, describe, it, expect, beforeEach */


const User = require('../../models/user')
const jwt = require('jsonwebtoken')
// const { secret } = require('../../config/environment')

const { userData } = require('../mock_data')

let _user
let token

describe('DELETE /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '6h' })
        return _user = user
      })
      .then(() => done())
  })

  it('should return a 401 response', done => {
    api
      .delete(`/api/users/${_user._id}`)
      // .send(userData)
      .expect(401, done)
  })

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/users/${_user._id}`)
      .set('Authorization', `Bearer ${token}`)
      // .send(userData)
      .expect(204, done)
  })

  it('should return empty', done => {
    api
      .delete(`/api/users/${_user._id}`)
      .set('Authorization', `Bearer ${token}`)
      // .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.empty
        done()
      })
  })
})
