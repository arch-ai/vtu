#!/usr/bin/env node
const yargs = require('yargs')
const extract = require('./index')

const coerceString = text => {
  return text.toString()
}

const builder = command =>
  command
  .positional('projectDir', {
    describe: "Project directory",
    coerce: coerceString
  })

const handler = ({projectDir}) => {
  console.log(extract(projectDir))
}

yargs.command("* <projectDir>", false, builder, handler).parse()
