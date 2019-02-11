/* global api, describe, it, expect, beforeEach */

const Package = require('../../models/package')
const User = require('../../models/user')

const { packageData } = require('../mock_data')

describe('GET /packages', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Package.remove({})
    ])
      .then(() => Package.create(packageData))
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/packages')
      .expect(200, done)
  })

  it('should return an array of packages', done => {
    api
      .get('/api/packages')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(_package => {
          expect(_package).to.include.keys([
            '_id',
            'name',
            'icon',
            'version',
            'keywords',
            'downloadsCount',
            'comments'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/packages')
      .end((err, res) => {
        res.body.forEach((_package, i) => {

          expect(_package.name).to.eq(packageData[i].name)


          expect(_package.icon).to.eq(packageData[i].icon)


          expect(_package.version).to.eq(packageData[i].version)


          expect(_package.keywords).to.deep.eq(packageData[i].keywords)


          expect(_package.downloadsCount).to.eq(packageData[i].downloadsCount)


          expect(_package.comments).to.deep.eq(packageData[i].comments)

        })
        done()
      })
  })
})
