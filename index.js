'use strict'

const {isNil, isString} = require('lodash')
const enums = require('./enums')
const {request} = require('./request')

const projectToken = process.env.EXPONEA_TOKEN

/**
 * Publish commands to exponea
 *
 * @param {Array} commands
 *   @param {String} name
 *   @param {String} type
 *   @param {String} customerId
 *   @param {String} data
 * @return {Promise}
 */
const publish = (commands) => {
  const timestamp = Math.floor(Date.now() / 1000)

  if (!isString(projectToken)) {
    throw new Error('EXPONEA_TOKEN environment variable not set')
  }

  const payload = {
    commands: commands.map(({name, type, customerId, data}) => {
      const idAlias = (
        name === enums.commands.EVENTS ? enums.CUSTOMER_IDS : enums.IDS
      )
      const properties = {}

      Object.keys(data).forEach((key) => {
        if (!isNil(data[key]) && data[key] !== '') {
          properties[key] = data[key]
        }
      })

      const command = {
        name,
        data: {
          [idAlias]: {
            registered: customerId
          },
          project_id: projectToken,
          properties,
          timestamp
        }
      }

      if (name === enums.commands.EVENTS) {
        command.data.type = type
      }

      return command
    })
  }

  request(enums.hostname, enums.path, payload)
    .then((body) => {
      if (!Array.isArray(body.results)) {
        console.error({error: body}, 'exponea unknown response')
        return
      }

      body.results.forEach((result, i) => {
        if (Array.isArray(result.errors)) {
          console.error(
            {
              error: result.errors,
              payload: payload[i]
            },
            'exponea command error'
          )
        }
      })
    })
    .catch((error) => {
      console.error({error, payload}, 'exponea api error')
    })
}

module.exports = {
  enums,
  publish
}
