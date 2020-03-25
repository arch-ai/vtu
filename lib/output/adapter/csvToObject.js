const _ = require ('lodash')

function csvToObject (stringData) {
  const dataObject = {}
  let csv = new RegExp('(^"|)(.*?)(",|,"|,)(((?!").)*)')

  let quoted = new RegExp('(^")(.*)(",")(((?!").)*)')


  _.forEach(stringData.split(/\r?\n/), (value) => {
    const quotedMatch = quoted.exec(value)
    const normalMatch = csv.exec(value)
    let match = []

    if (quotedMatch) {
      match = quotedMatch
    } else if (normalMatch) {
      match = normalMatch
    } else {
      return
    }

    const foundKey = match[2]
    const foundValue = match[4]


    if (foundKey === 'string') {
      return
    }
    dataObject[foundKey] = foundValue
  })

  return dataObject
}

module.exports = csvToObject
