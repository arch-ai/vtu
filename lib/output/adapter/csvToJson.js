const _ = require ('lodash')
const toJson = require.main.require ('./lib/output/toJson')

/**
 * Csv to json conversion
 *
 * @param {string} filePath
 */
function csvToJson (sourceData, targetData) {
  let jsonOutput = {}
  let csv = new RegExp('(^"|)(.*)\\b(","|",|,"|,)\\b(.*)')
  _.forEach(sourceData.split(/\r?\n/), (value) => {
    const match = csv.exec(value)
    if (match === null) {
      return
    }
    const foundKey = match[2]
    const foundValue = match[4].replace(/"$/, '')

    if (foundKey === 'string') {
      return
    }
    jsonOutput[foundKey] = foundValue
  })

  const output = toJson(jsonOutput)

  console.log(_.size(jsonOutput) + ' Strings converted')
  return output
}

module.exports = csvToJson
