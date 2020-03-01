const _ = require('lodash')
const fs = require('fs')

const jsonToCsv = require.main.require ('./lib/output/adapter/jsonToCsv')
const csvToJson = require.main.require ('./lib/output/adapter/csvToJson')
const saveToFile = require.main.require ('./lib/output/saveToFile')

/**
 * Get file type extension based on file path
 *
 * @param filePath
 * @return {string}
 */
function getFileType (filePath) {
  return filePath.split('.').pop()
}

function getLocation (filePath) {
  return filePath.replace('.' + getFileType (filePath), '')
}

/**
 * Get target file contents based on path
 *
 * @param targetFilePath
 * @return {boolean|string}
 */
function getTargetContents (targetFilePath) {
  try {
    return fs.readFileSync(targetFilePath, 'utf8')
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('no file found for target, entering file generation')
    } else {
      console.log(e)
    }
  }
  return false
}

/**
 * Get source file contents based on path
 *
 * @param sourceFilePath
 * @return {boolean|string}
 */
function getSourceContents (sourceFilePath) {
  try {
    return fs.readFileSync(sourceFilePath, 'utf8')
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('No source file found, exiting...')
    } else {
      console.log(e)
    }
  }

  return false
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
      saveToFile(getLocation(targetFilePath), targetType, csvToJson(sourceContent, targetContent))
      break
    case 'json->csv':
      saveToFile(getLocation(targetFilePath), targetType, jsonToCsv(sourceContent, targetContent))
      break
    default:
      console.log('no handler found for ' + sourceType + '->' + targetType)
  }

}

module.exports = convert
