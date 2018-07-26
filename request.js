'use strict'

const https = require('https')
const enums = require('./enums')

const debug = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(args.join(' '))
  }
}

/**
 * performs a https post request to exponea api
 *
 * @param {String} hostname
 * @param {String} path
 * @param {Object} payload to pass through
 * @return {Promise}
 */
const request = (hostname, path, payload) => new Promise((resolve, reject) => {
  const requestOptions = Object.assign(
    {},
    enums.requestOptions,
    {hostname, path}
  )

  debug('exponea api request ->', JSON.stringify(payload))

  const request = https.request(requestOptions, (response) => {
    const body = []

    if (response.statusCode === 200) {
      response.setEncoding('utf8')
      response.on('data', (chunk) => body.push(chunk))
      response.on('end', () => {
        let result = null

        try {
          result = JSON.parse(body.join(''))
        } catch (error) {
          return reject(new Error(
            `Error in requesting exponea
            status: ${response.statusCode}
            body: ${body}
            error: ${error}`
          ))
        }

        debug('exponea api response ->', body.join(''))

        resolve(result)
      })
    } else {
      return reject(new Error(
        `Error in requesting exponea
        status: ${response.statusCode}
        body: ${body}
        headers: ${JSON.stringify(response.headers)}`
      ))
    }
  })
    .setTimeout(enums.timeout, () => {
      request.destroy(new Error(enums.timeoutMessage))
    })
    .on('error', reject)

  request.end(JSON.stringify(payload))
})

module.exports = {
  request
}
