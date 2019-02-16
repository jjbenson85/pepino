/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

let _project
// let aProject
// let _user

describe('GET /search/:search', () => {
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
      .get(`/api/projects/search/${_project.name}`)
      .expect(200, done)
  })

  it('should return an array', done => {
    api
      .get(`/api/projects/search/${_project.name}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return a project', done => {
    api
      .get(`/api/projects/search/${_project.name}`)
      .end((err, res) => {
        expect(res.body[0]).to.include.keys([
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
      .get(`/api/projects/search/${_project.name}`)
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
