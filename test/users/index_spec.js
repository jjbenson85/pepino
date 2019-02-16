/* global api, describe, it, expect, beforeEach */

const User = require('../../models/user')

const { userData } = require('../mock_data')

describe('GET /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/users')
      .expect(200, done)
  })

  it('should return an array of users', done => {
    api
      .get('/api/users')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(user => {
          expect(user).to.include.keys([
            '_id',
            'username',
            'bio',
            'project',
            'email',
            'image'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/users')
      .end((err, res) => {
        res.body.forEach((user) => {
          expect(user.name).to.eq(userData.name)
          expect(user.description).to.eq(userData.description)
          expect(user.comments).to.deep.eq(userData.comments)
        })
        done()
      })
  })
})
