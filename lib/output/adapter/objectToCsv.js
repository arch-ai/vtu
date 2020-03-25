const toCsv = require.main.require ('./lib/output/toCsv')

/**
 * Object to csv conversion
 *
 * @param objectData
 *
 * @return {string}
 */
function objectToCsv (objectData) {
  return toCsv(objectData)
}

module.exports = objectToCsv
