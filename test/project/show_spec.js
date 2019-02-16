/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

let _project
// let aProject
// let _user

describe('GET /projects/:name', () => {
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
      .then(project => {
        return _project = project[0]
      })
      .then(() => done())
  })
  //
  it('should return a 200 response', done => {
    api
      .get(`/api/projects/${_project._id}`)
      .expect(200, done)
  })
  //
  it('should return a project', done => {
    api
      .get(`/api/projects/${_project._id}`)
      .end((err, res) => {
        expect(res.body).to.include.keys([
          'name',
          'description',
          'user',
          'packages',
          'visible',
          'comments'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get(`/api/projects/${_project._id}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(projectData[0].name)
        expect(res.body.description).to.eq(projectData[0].description)
        expect(res.body.comments).to.deep.eq(projectData[0].comments)
        done()
      })
  })
})
