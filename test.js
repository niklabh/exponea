/* globals describe, before, after, it */
'use strict'

const sinon = require('sinon')
const expect = require('chai').expect
const request = require('./request')
const exponea = require('./')

describe('Publish Event', () => {
  before(async () => {
    sinon.stub(request, 'request').resolves({
      end_time: Date.now() + 1000,
      results: [{status: 'ok'}],
      start_time: Date.now(),
      success: true
    })
  })

  after(() => request.request.restore())

  it('should publish customer event', async () => {
    exponea.publish()
  })

  it('should publish custom event', async () => {

  })
})
