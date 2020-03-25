const fs = require ('fs')

function isFile (filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return true
    }
  } catch(err) {
  }

  return false
}

module.exports = isFile
