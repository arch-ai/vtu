const _ = require ('lodash')
const toJson = require.main.require ('./lib/output/toJson')

/**
 * Object to Json conversion
 *
 * @param objectData
 * @return {*}
 */
function objectToJson (objectData) {
  const output = toJson(objectData)
  console.log(_.size(objectData) + ' Strings converted')

  return output
}

module.exports = objectToJson
