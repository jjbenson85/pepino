/* global api, describe, it, expect, beforeEach */
const User = require('../../models/user')
const { userData } = require('../mock_data')

describe('POST /register', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => done())
  })
  it('should return a message and stauts 201', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.message).to.eq('Users has been created sucessfully')
        done()
      })
  })
})
console.log(userData)
