#!/usr/bin/env node
const yargs = require('yargs')
const chalk = require('chalk');
const currentPackage = require('./package.json');

require('yargonaut')
.style('blue')
.style('green.underline', 'Examples:')
.errorsStyle('red')

const extractCommand = require('./lib/command/extract')
const convertCommand = require('./lib/command/convert')

console.log("\r\n" + chalk.green("VTU - " + currentPackage.version) + "\r\n")

yargs.command({
    command: 'extract <dir> [type] [location]',
    desc: chalk.green(
      'extract translation strings and save as output to file \r\n ' +
      '------------------------------------'
    ),
    aliases: ['e'],
    builder: (yargs) => {
      yargs.positional('dir', {
        describe: chalk.green('starting dir'),
        type: 'string',
        default: chalk.white('./')
      })
      .positional('location', {
        describe: 'File relative location',
        type: 'string',
        default: ''
      })
      .positional('type', {
        describe: 'Output type',
        type: 'string',
        default: 'json'
      })
    },
    handler: (argv) => {
      extractCommand(argv.dir, argv.type, argv.location)
    }
}).command({
    command: 'convert <source> <target>',
    desc: chalk.green('convert source file format to target file format'),
    aliases: ['c'],
    builder: (yargs) => {
      yargs.positional('source', {
        describe: 'Source File (relative location)',
        type: 'string'
      })
      .positional('target', {
        describe: 'Target File (relative location)',
        type: 'string'
      })
    },
    handler: (argv) => {
      convertCommand(argv.source, argv.target)
    }
})
.example(chalk.yellow('$0 extract ./ csv ./locale/en_US'))
.example(chalk.white(" - extract and save to csv file"))
.example(chalk.yellow('$0 extract ./ json ./locale/en_US'))
.example(chalk.white(" - extract and save to json file"))
.example(chalk.yellow('$0 convert ./locale/en_US.json ./locale/en_US.csv'))
.example(chalk.white(" - convert json to csv format"))
.example(chalk.yellow('$0 convert ./locale/en_US.csv ./locale/en_US.json'))
.example(chalk.white(" - convert csv to json format"))
.help()
.argv
