'use strict'

const should = require('should')
const request = require('supertest')
const app = require('./app')

describe('validate body and flatten errors', function () {
  describe('when the request has multiple missing items in payload', function () {
    it('should return a 400 ok response and two errors flattened', function (done) {
      var register = {
        email: '',
        password: '',
      }

      request(app)
        .post('/register')
        .send(register)
        .expect(400)
        .end(function (err, res) {
          const response = res.body

          response.should.have.keys('status', 'statusText', 'errors')
          should.exist(response.errors)
          response.errors.should.have.length(4)
          done()
        })
    })
  })
})
