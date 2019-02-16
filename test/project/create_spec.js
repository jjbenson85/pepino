/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
// const { secret } = require('../../config/environment')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

let token

describe('POST /projects', () => {
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
      .then(() => done())
  })

  it('should return a 401 response', done => {
    api
      .post('/api/projects')
      .send(projectData)
      .expect(401, done)
  })

  it('should return a 201 response with a token', done => {
    api
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[0])
      .expect(201, done)
  })

  it('should return the created project', done => {
    api
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[0])
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
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(projectData[0])
      .end((err, res) => {
        expect(res.body.name).to.eq(projectData[0].name)
        expect(res.body.description).to.eq(projectData[0].description)
        expect(res.body.comments).to.deep.eq(projectData[0].comments)
        done()
      })
  })
})
