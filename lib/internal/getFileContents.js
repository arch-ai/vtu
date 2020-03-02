const fs = require ('fs')
const chalk = require ('chalk')

/**
 * Get file contents based on file path
 *
 * @param {string} filePath
 * @param {string} exceptionMessage
 *
 * @return {boolean|string} false if no file was found
 */
function getFileContents (filePath, exceptionMessage= false) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    if (exceptionMessage && error.code === 'ENOENT') {
      console.log(chalk.red(exceptionMessage) + '\r\n')
    } else {
      console.log(error)
    }

  }

  return false
}

module.exports = getFileContents
