/* global api, describe, it, expect, beforeEach */

const Package = require('../../models/package')
const User = require('../../models/user')

const { packageData, userData } = require('../mock_data')

let _package
let _user
const commentText = 'some text'

describe('POST /packages/:name', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Package.remove({})
    ])
      .then(() => Package.create(packageData))
      .then(packages => _package = packages[0])
      .then(() => User.create(userData))
      .then(user => _user = user)
      .then(() => done())
  })

  it('should return a 201 response', done => {
    api
      .post(`/api/packages/${_package.name}`)
      .send({
        text: 'some text',
        user: _user._id
      })
      .expect(201, done)
  })

  it('should return the correct data', done => {
    api
      .post(`/api/packages/${_package.name}`)
      .send({
        text: commentText,
        user: _user._id
      })
      .end((err, res) => {
        expect(res.body.comments[0].text).to.eq(commentText)
        expect(res.body.comments[0].user).to.eq(_user.id)
        done()
      })
  })
})
