/* global api, describe, it, expect, beforeEach */

const Package = require('../../models/package')
const User = require('../../models/user')

const { packageData } = require('../mock_data')

let _package



describe('POST /packages/multi', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Package.remove({})
    ])
      .then(() => Package.create(packageData))
      .then(packages => _package = packages[0])
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .post('/api/packages/multi')
      .send({names: ['webpack','webpack-dev-server']})
      .expect(200, done)
  })

  it('should return an array', done => {
    api
      .post('/api/packages/multi')
      .send({names: ['webpack','webpack-dev-server']})
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of packages', done => {
    api
      .post('/api/packages/multi')
      .send({names: ['webpack','webpack-dev-server']})
      .end((err, res) => {
        // console.log('multi', res.body)

        expect(res.body[0]).to.include.keys([
          '_id',
          'description',
          'name',
          'icon',
          'version',
          'keywords',
          'downloadsCount',
          'comments'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .post('/api/packages/multi')
      .send({names: ['webpack','webpack-dev-server']})
      .end((err, res) => {
        expect(res.body[0].name).to.eq(_package.name)
        expect(res.body[0].icon).to.eq(_package.icon)
        expect(res.body[0].version).to.eq(_package.version)
        expect(res.body[0].keywords).to.deep.eq(_package.keywords)
        expect(res.body[0].downloadsCount).to.eq(_package.downloadsCount)
        expect(res.body[0].comments).to.deep.eq(_package.comments)

        done()
      })
  })
})
