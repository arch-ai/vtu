const _ = require('lodash')

/**
 * Normalize array or object to key value pairs
 *
 * @param {{}[]}data
 * @param {{}}parsedData
 *
 * @return {{}}
 */
function normalizeData (data, parsedData) {
  _.forEach(data, (value, key) => {
    if (isNaN(key)) {
      parsedData[key] = value
    } else {
      parsedData[value] = value
    }
  })

  return parsedData
}

module.exports = normalizeData
