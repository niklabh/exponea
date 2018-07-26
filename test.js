/* globals describe, before, after, it */
'use strict'

const sinon = require('sinon')
const expect = require('chai').expect

describe('Publish Event', () => {
  let request
  let exponea
  const timestamp = 234234234

  before(async () => {
    request = require('./request')

    sinon.stub(Date, 'now').returns(timestamp)

    sinon.stub(request, 'request').resolves({
      end_time: Date.now() + 1000,
      results: [{status: 'ok'}],
      start_time: Date.now(),
      success: true
    })

    exponea = require('./')
  })

  after(() => {
    request.request.restore()
    Date.now.restore()
  })

  it('should publish customer event', async () => {
    exponea.publish([{
      name: exponea.enums.CUSTOMERS,
      customerId: '2342-wedasd-234aws-asd45d',
      data: {
        name: 'Alan paul',
        email: 'alan@gmail.com',
        phone: '0092838842222'
      }
    }])

    expect(request.request.called).equal(true)
    expect(
      request.request.calledWith(
        exponea.enums.hostname,
        exponea.enums.path,
        {
          commands: [{
            name: exponea.enums.CUSTOMERS,
            data: {
              ids: {
                registered: '2342-wedasd-234aws-asd45d'
              },
              project_id: 'test',
              properties: {
                name: 'Alan paul',
                email: 'alan@gmail.com',
                phone: '0092838842222'
              },
              timestamp: timestamp
            }
          }]
        }
      )
    )
  })

  it('should publish custom event', async () => {
    exponea.publish([{
      name: exponea.enums.EVENTS,
      customerId: '2342-wedasd-234aws-asd45d',
      data: {
        price: 25,
        qty: 3
      }
    }])

    expect(request.request.called).equal(true)
    expect(
      request.request.calledWith(
        exponea.enums.hostname,
        exponea.enums.path,
        {
          commands: [{
            name: exponea.enums.EVENTS,
            data: {
              customer_ids: {
                registered: '2342-wedasd-234aws-asd45d'
              },
              project_id: 'test',
              properties: {
                price: 25,
                qty: 3
              },
              timestamp: timestamp
            }
          }]
        }
      )
    )
  })
})
