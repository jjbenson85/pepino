/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
// const { secret } = require('../../config/environment')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

let token
let _project

describe('DELTE /projects', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Project.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '6h' })
        return user
      })
      .then(user => projectData = projectData.map(proj => {
        return {...proj, user: `${user._id}` }
      }) )
      .then((project) => Project.create(project))
      .then(project => {
        return _project = project[0]
      })
      .then(() => done())
  })

  it('should return a 401 response', done => {
    api
      .delete(`/api/projects/${_project._id}`)
      .send(projectData)
      .expect(401, done)
  })

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/projects/${_project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[0])
      .expect(204, done)
  })

  it('should return empty', done => {
    api
      .delete(`/api/projects/${_project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[0])
      .end((err, res) => {
        expect(res.body).to.be.empty
        done()
      })
  })
})
