const chai = require('chai')
const wispy = require('../index.js')
const should = chai.should()

describe('wispy', () => {
  it('should do something', () => {
    wispy().should.equal(12345)
  })
})
