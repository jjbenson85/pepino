/* global api, describe, it, expect, beforeEach */


const User = require('../../models/user')
const jwt = require('jsonwebtoken')
// const { secret } = require('../../config/environment')

const { userData } = require('../mock_data')

let _user
let token

describe('PUT /users', () => {
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
      .put(`/api/users/${_user._id}`)
      .send(userData)
      .expect(401, done)
  })

  it('should return a 201 response with a token', done => {
    api
      .put(`/api/users/${_user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .expect(201, done)
  })

  it('should return the updated user', done => {
    api
      .put(`/api/users/${_user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include.keys([
          '_id',
          'username',
          'bio',
          'project',
          'email',
          'image'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .put(`/api/users/${_user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body.name).to.eq(userData.name)
        expect(res.body.description).to.eq(userData.description)
        expect(res.body.comments).to.deep.eq(userData.comments)
        done()
      })
  })
})
