const _ = require('lodash')

function toJson (extractedStrings) {
  let json = {}
  _.forEach(extractedStrings, (value, key) => {
    if (isNaN(key)) {
      json[key] = value
    } else {
      json[value] = value
    }
  })

  return JSON.stringify(json, null, 1)
}

module.exports = toJson
