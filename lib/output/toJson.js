const _ = require('lodash')
const normalizeData = require.main.require('./lib/internal/normalizeData')

/**
 * Convert object / array to json
 *
 * @param extractedStrings
 * @return {string}
 */
function toJson (extractedStrings) {
  let json = {}
  normalizeData(extractedStrings, json)

  return JSON.stringify(json, null, 1)
}

module.exports = toJson
