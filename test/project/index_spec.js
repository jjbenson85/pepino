/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

describe('GET /projects', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Project.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => projectData = projectData.map(proj => {
        return {...proj, user: `${user._id}` }
      }) )
      .then((project) => Project.create(project))
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/projects')
      .expect(200, done)
  })

  it('should return an array of projects', done => {
    api
      .get('/api/projects')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(_project => {
          expect(_project).to.include.keys([
            'name',
            'description',
            'user',
            'packages',
            'visible',
            'comments'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/projects')
      .end((err, res) => {
        res.body.forEach((_project, i) => {
          expect(_project.name).to.eq(projectData[i].name)
          expect(_project.description).to.eq(projectData[i].description)
          expect(_project.comments).to.deep.eq(projectData[i].comments)
        })
        done()
      })
  })
})
