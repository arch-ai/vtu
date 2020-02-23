const fs = require('fs');

class PathObject {
  constructor() {
    this.fullPath = null
    this.stats = null
  }

  /**
   * Set full path
   *
   * @param {string} fullPath
   */
  setFullPath (fullPath) {
    this.fullPath = fullPath
    this.stats = fs.statSync(fullPath)
  }

  /**
   * Check if path is a directory
   *
   * @return {boolean}
   */
  isDir () {
    return this.stats.isDirectory()
  }

  /**
   * Check if path is a file
   *
   * @return {boolean}
   */
  isFile () {
    return this.stats.isFile()
  }

  /**
   * Check if path is a match based on RegExp
   *
   * @param pattern
   *
   * @return {boolean}
   */
  isMatch (pattern) {
    return this.testPattern(this.fullPath,pattern)
  }

  /**
   * Check if path is excluded based on RegExp
   *
   * @param {[]} excluded array of dir names to be matched as excluded
   *
   * @return {boolean}
   */
  isExcluded (excluded = []) {
    if (excluded.length === 0) {
      return false
    }

    return this.testPattern(this.fullPath, '('+ excluded.join('|') +')');
  }

  /**
   * Test a RegExp pattern on value
   *
   * @param {string} value string
   * @param {string} pattern RegExp pattern
   *
   * @return {boolean}
   */
  testPattern (value, pattern) {
    const regExp = new RegExp(pattern)

    return regExp.test(value)
  }
}

module.exports = PathObject
