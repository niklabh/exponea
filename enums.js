'use strict'

exports.hostname = 'api.exponea.com'
exports.path = '/bulk'
exports.timeout = 1000 * 15
exports.timeoutMessage = 'exponea request timeout'

exports.requestOptions = {
  protocol: 'https:',
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  json: true
}

exports.commands = {
  EVENTS: 'crm/events',
  CUSTOMERS: 'crm/customers'
}

exports.CUSTOMER_IDS = 'customer_ids'
exports.IDS = 'ids'
