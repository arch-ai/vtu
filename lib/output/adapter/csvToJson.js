const _ = require ('lodash')
const toJson = require.main.require ('./lib/output/toJson')
const csvToObject = require.main.require ('./lib/output/adapter/csvToObject')

/**
 * Csv to json conversion
 *
 * @param {string} sourceData
 *
 * @return {string}
 */
function csvToJson (sourceData) {
  const objectData = csvToObject(sourceData)
  const output = toJson(objectData)
  console.log(_.size(objectData) + ' Strings converted')

  return output
}

module.exports = csvToJson
