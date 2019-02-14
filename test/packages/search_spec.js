/* global api, describe, it, expect, beforeEach */

const Package = require('../../models/package')
const User = require('../../models/user')

// var sinon = require('sinon')
// var stub = sinon.stub()

const { packageData } = require('../mock_data')

let _package

describe('GET /packages/search/:search', () => {
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

  it('should return an array', done => {
    api
      .get(`/api/packages/search/${_package.name}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of packages', done => {
    api
      .get(`/api/packages/search/${_package.name}`)
      .end((err, res) => {
        expect(res.body[0]).to.include.keys([
          '_id',
          'name',
          'icon',
          'version',
          'keywords',
          'downloadsCount',
          'comments',
          'npms'
        ])
        expect(res.body[0].npms).to.include.keys([
          'name',
          'scope',
          'version',
          'description',
          'date',
          'links',
          'author',
          'publisher',
          'maintainers'
        ])
        done()
      })
  })

  it('should return the correct data', done => {

    api
      .get(`/api/packages/search/${_package.name}`)
      .end((err, res) => {
        expect(res.body[0].name).to.eq(_package.name)
        expect(res.body[0].icon).to.eq(_package.icon)
        expect(res.body[0].version).to.eq(_package.version)
        expect(res.body[0].keywords).to.deep.eq(_package.keywords)
        expect(res.body[0].downloadsCount).to.eq(_package.downloadsCount)
        expect(res.body[0].comments).to.deep.eq(_package.comments)
        expect(res.body[0].npms.name).to.eq(_package.name)
        done()
      })
  })


  // it('should return error when external API is down', done => {
  //   var stub = sinon.stub(api, 'get').return(500)
  //   api
  //     .get(`/api/packages/search/${_package.name}`)
  //     .end((err, res) => {
  //       console.log(res.body)
  //       expect(res).to.eq('500')
  //       done()
  //     })
  //   stub.resetBehavior()
  // })
})
