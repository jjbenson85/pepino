/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
// const { secret } = require('../../config/environment')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

let _project
let token

describe('PUT /projects', () => {
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
      .put(`/api/projects/${_project._id}`)
      .send(projectData)
      .expect(401, done)
  })

  it('should return a 201 response with a token', done => {
    api
      .put(`/api/projects/${_project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[1])
      .expect(201, done)
  })

  it('should return the updated project', done => {
    api
      .put(`/api/projects/${_project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include.keys([
          '_id',
          'name',
          'description',
          'user',
          'comments'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .put(`/api/projects/${_project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[1])
      .end((err, res) => {
        expect(res.body.name).to.eq(projectData[1].name)
        expect(res.body.description).to.eq(projectData[1].description)
        expect(res.body.comments).to.deep.eq(projectData[1].comments)
        done()
      })
  })
})
