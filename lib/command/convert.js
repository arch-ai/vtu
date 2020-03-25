const jsonToCsv = require.main.require ('./lib/output/adapter/jsonToCsv')
const csvToJson = require.main.require ('./lib/output/adapter/csvToJson')
const saveToFile = require.main.require ('./lib/output/saveToFile')
const getFileContents = require.main.require ('./lib/internal/getFileContents')

/**
 * Get file type extension based on file path
 *
 * @param filePath
 * @return {string}
 */
function getFileType (filePath) {
  return filePath.split('.').pop()
}

/**
 * Get base location from filepath
 *
 * @param filePath
 * @return {any | void | string}
 */
function getLocation (filePath) {
  return filePath.replace('.' + getFileType (filePath), '')
}

/**
 * Get target file contents based on path
 *
 * @param targetFilePath
 *
 * @return {boolean|string}
 */
function getTargetContents (targetFilePath) {
  return getFileContents(
    targetFilePath,
    `No file found for target: ${targetFilePath}, entering file generation`)
}

/**
 * Get source file contents based on path
 *
 * @param sourceFilePath
 *
 * @return {boolean|string}
 */
function getSourceContents (sourceFilePath) {
  return getFileContents(
    sourceFilePath,
    `No source file found: ${sourceFilePath}, exiting...`
  )
}

/**
 * Convert from one type to another based on source / target file paths
 *
 * @param {string} sourceFilePath
 * @param {string} targetFilePath
 */
const convert = (sourceFilePath, targetFilePath) => {
  const sourceType = getFileType(sourceFilePath)
  const targetType = getFileType(targetFilePath)
  let sourceContent, targetContent = ''

  sourceContent = getSourceContents(sourceFilePath)
  targetContent = getTargetContents(targetFilePath)
  if (sourceContent === false) return

  switch (sourceType + '->' + targetType) {
    case 'csv->json':
      saveToFile(getLocation(targetFilePath), targetType, csvToJson(sourceContent))
      break
    case 'json->csv':
      saveToFile(getLocation(targetFilePath), targetType, jsonToCsv(sourceContent))
      break
    default:
      console.log('no handler found for ' + sourceType + '->' + targetType)
  }

}

module.exports = convert
