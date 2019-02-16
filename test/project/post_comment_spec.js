/* global api, describe, it, expect, beforeEach */

const Project = require('../../models/project')
const User = require('../../models/user')

let { projectData } = require('../mock_data')
const { userData } = require('../mock_data')

let _project
let _user
const commentText = 'some text'

describe('POST /projects/:id/comments', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Project.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => projectData = projectData.map(proj => {
        return {...proj, user: `${user._id}` }
      }) )
      .then(user => _user = user)
      .then(() => Project.create(projectData))
      .then(projects => _project = projects[0])
      .then(() => done())
  })

  it('should return a 201 response', done => {
    api
      .post(`/api/projects/${_project._id}/comments`)
      .send({
        text: 'some text',
        user: _user._id
      })
      .expect(201, done)
  })

  it('should return the correct data', done => {
    api
      .post(`/api/projects/${_project._id}/comments`)
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
