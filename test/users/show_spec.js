/* global api, describe, it, expect, beforeEach */

const User = require('../../models/user')

const { userData } = require('../mock_data')

let _user

describe('GET /users/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then((user) => _user = user)
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/users')
      .expect(200, done)
  })

  it('should return an array of users', done => {
    api
      .get(`/api/users/${_user._id}`)
      .end((err, res) => {
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
      .get(`/api/users/${_user._id}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(userData.name)
        expect(res.body.description).to.eq(userData.description)
        expect(res.body.comments).to.deep.eq(userData.comments)
        done()
      })
  })
})
