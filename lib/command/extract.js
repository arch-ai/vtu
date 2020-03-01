const _ = require('lodash')

const FileSearch = require.main.require ('./lib/extract/fileSearch')
const ContentMatches = require.main.require ('./lib/extract/contentMatches')
const saveToFile = require.main.require ('./lib/output/saveToFile')
const toCsv = require.main.require ('./lib/output/toCsv')
const toJson = require.main.require ('./lib/output/toJson')

/**
 * Execute function for extracted strings
 *
 * @param extractedStrings
 * @param outputType
 * @param fileLocation
 */
function execute (extractedStrings, outputType, fileLocation) {

  console.log(extractedStrings.length + ' strings found', fileLocation)
  if (fileLocation === '') {
    console.log(extractedStrings)
    console.log('add a file location to save the extracted strings; eg. ./locale/en_US')
  }

  switch (outputType) {
    case 'json':
      const jsonOutput = toJson(extractedStrings)
      saveToFile(fileLocation, outputType, jsonOutput)
      break
    case 'csv':
      const csvOutput = toCsv(extractedStrings)
      saveToFile(fileLocation, outputType, csvOutput)
      break
  }
}

/**
 * Extract strings based on a source directory
 *
 * @param dir
 * @param outputType
 * @param fileLocation
 * @return {Array}
 */
function extract (dir, outputType, fileLocation) {
  const excluded = [
    'node_modules',
    '\\.nuxt',
    'dist',
    'vue-translate-extract'
  ]
  const fileSearch = new FileSearch()
  const contentMatches = new ContentMatches()
  const files = fileSearch
  .setStartingDir(dir)
  .setExcludedDirs(excluded)
  .setSearchPattern('.?(js|vue)$')
  .getResults()

  let allMatches = {}
  _.forEach(files, (filePath) => {
    const fileMatches = contentMatches.setFullPath(filePath).getMatches()
    if (_.size(fileMatches) > 0) {
      allMatches = _.concat(allMatches, fileMatches)
    }
  })

  allMatches = _.uniq(_.filter(allMatches, (value) => {
    return typeof value === 'string'
  }))

  execute (allMatches, outputType, fileLocation)

  return allMatches
}

module.exports = extract
