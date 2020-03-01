const fs = require('fs');
const _ = require('lodash')

class ContentMatches {
  constructor () {
    this.fullPath = null
    this.content = null
  }

  /**
   *
   * @param fullPath
   *
   * @return {ContentMatches}
   */
  setFullPath (fullPath) {
    this.fullPath = fullPath
    this.content = fs.readFileSync(fullPath, 'utf8')

    return this
  }

  /**
   * Get translation matches
   *
   * @return {[]}
   */
  getMatches() {
    const methodRegPattern = /(?:[$ .]tc?)\(\s*?("|'|`)(.*?)\1/g;
    const componentRegPattern = /(?:<i18n|<I18N)(?:.|\n)*?(?:[^:]path=("|'))(.*?)\1/g;
    const directiveRegPattern = /v-t="'(.*)'"/g;
    const methodMatches = [...this.captureMatches(this.content, methodRegPattern, 2)];
    const componentMatches = [...this.captureMatches(this.content, componentRegPattern, 2)];
    const directiveMatches = [...this.captureMatches(this.content, directiveRegPattern, 1)];

    return _.concat(methodMatches, componentMatches, directiveMatches)
  }

  *captureMatches (content, regExp, captureGroup) {
    while (true) {
      const match = regExp.exec(content);
      if (match === null) break
      yield match[captureGroup]
    }
  }
}

module.exports = ContentMatches
