const toCsv = require.main.require ('./lib/output/toCsv')

/**
 * Json to csv conversion
 *
 * @param sourceData
 * @param targetData
 * @return {string}
 */
function jsonToCsv (sourceData, targetData) {
  const json = JSON.parse(sourceData)
  return toCsv(json)
}

module.exports = jsonToCsv
