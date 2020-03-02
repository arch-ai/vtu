const fs = require('fs')
const chalk = require('chalk')

const saveToFile = (location, type, contents) => {
  const filePath = location + '.' + type
  if (location === '') {
    return
  }
  try {
    fs.writeFileSync(filePath, contents)
    console.log(chalk.green('Output saved to ' + filePath + '\r\n'))
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(chalk.red('Could not save to file, directory does not exist' + '\r\n'))
    }

    console.log(chalk.yellow(e))
  }
}

module.exports = saveToFile
