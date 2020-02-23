const FileSearch = require('./library/fileSearch')
const ContentMatches = require ('./library/contentMatches')
const _ = require('lodash')

function extract (dir) {
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

  return allMatches
}

module.exports = extract
