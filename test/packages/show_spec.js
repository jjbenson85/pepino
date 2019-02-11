/* global api, describe, it, expect, beforeEach */

const Package = require('../../models/package')
const User = require('../../models/user')

const { packageData } = require('../mock_data')

let _package

describe('GET /packages/:name', () => {
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
      .get('/api/packages')
      .expect(200, done)
  })

  it('should return a package', done => {
    api
      .get(`/api/packages/${_package.name}`)
      .end((err, res) => {
        expect(res.body).to.include.keys([
          'pepino',
          'npms'
        ])
        expect(res.body.pepino).to.include.keys([
          '_id',
          'name',
          'icon',
          'version',
          'keywords',
          'downloadsCount',
          'comments'
        ]),
        expect(res.body.npms).to.include.keys([
          'analyzedAt',
          'collected',
          'evaluation',
          'score'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get(`/api/packages/${_package.name}`)
      .end((err, res) => {
        expect(res.body.pepino.name).to.eq(_package.name)
        expect(res.body.pepino.icon).to.eq(_package.icon)
        expect(res.body.pepino.version).to.eq(_package.version)
        expect(res.body.pepino.keywords).to.deep.eq(_package.keywords)
        expect(res.body.pepino.downloadsCount).to.eq(_package.downloadsCount)
        expect(res.body.pepino.comments).to.deep.eq(_package.comments)

        expect(res.body.npms.collected.metadata.name).to.eq(_package.name)
        done()
      })
  })
})
