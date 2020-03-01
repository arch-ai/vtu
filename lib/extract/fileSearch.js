const fs = require('fs');
var path = require('path');
const PathObject = require.main.require ('./lib/extract/pathObject')

class FileSearch {
  constructor () {
    this.results = []
    this.pathObject = new PathObject()
    this.pattern = null
    this.excluded = null
    this.startDir = null
  }

  /**
   * Set search pattern (RegExp)
   *
   * @param {string} pattern
   *
   * @return {FileSearch}
   */
  setSearchPattern(pattern) {
    this.pattern = pattern

    return this
  }

  /**
   * Set starting dir of search
   *
   * @param startDir
   *
   * @return {FileSearch}
   */
  setStartingDir(startDir) {
    this.startDir = startDir

    return this
  }

  /**
   * Set excluded directory list
   *
   * @param {[]} excluded a list [] of dir names to be excluded from search
   */
  setExcludedDirs(excluded) {
    this.excluded = excluded

    return this
  }

  /**
   * Get results with found files
   *
   * @return {[]} a list [] of files that matched
   */
  getResults() {
    if (this.results.length > 0) {
      return this.results
    }

    return this.recursiveSearch(this.startDir, this.pattern, this.excluded)
  }

  /**
   * Recurive search all files that match the pattern provided from a starting directory
   *
   * @param {string} dir
   * @param {string} pattern
   * @param {[]} excluded
   *
   * @return {[]}
   */
  recursiveSearch (dir, pattern, excluded) {
    const context = this
    let results = []
    fs.readdirSync(dir).forEach(function (fullPath) {
      fullPath = path.resolve(dir, fullPath);
      const pathObject = context.pathObject
      pathObject.setFullPath(fullPath)
      if (pathObject.isDir() && !pathObject.isExcluded(excluded)) {
        results = results.concat(context.recursiveSearch(fullPath, pattern, excluded));
      }

      pathObject.setFullPath(fullPath)
      if (pathObject.isFile() && !pathObject.isExcluded(excluded) && pathObject.isMatch(pattern)) {
        results.push(fullPath);
      }
    });

    return results;
  };
}

module.exports = FileSearch
