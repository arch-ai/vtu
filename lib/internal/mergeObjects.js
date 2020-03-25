const _ = require('lodash')

function mergeObjects (sourceObject, overwriteObject) {
  return _.merge(sourceObject, overwriteObject)
}
