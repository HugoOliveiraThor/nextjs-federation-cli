#!/usr/bin/env node

/**
 * Copyright (c) 2023-present, Hugo Oliveira.
 */
const path = require('path')
const sao = require('sao')
const chalk = require('chalk')
const redent = require('redent')

const currentNodeVersion = process.versions.node
const semverNode = currentNodeVersion.split('.')
const majorNodeVersion = semverNode[0]

if (majorNodeVersion < 16) {
  const message = redent(
    `
    You are running Node ${currentNodeVersion}
    Create Modular App requires Node 16 or higher.
    Please update your version of Node.
    `,
    2
  )
  console.error(message)
  process.exit(1)
}

const appName = process.argv[2]

if (!appName) {
  const message = redent(
    `
    ${chalk.bold.red(
      'App name is required and should have more than 5 letters.'
    )}
    npm init create-module-federation-app new-app
    `,
    2
  )
  console.error(message)
  process.exit(1)
} else if (appName.replace(/\W/g, '').length < 6) {
  const message = redent(
    `
    ${chalk.bold.red('App name should have more than 5 letters.')}
    `,
    2
  )
  console.error(message)
  process.exit(1)
} else {
  const message = chalk.cyan(
    redent(
      `
      *******************************************
      *******************************************
      *******************************************
      *Create Module Federation App with Next.js *
      `,
      2
    )
  )
  console.info(message)

  const generator = path.resolve(__dirname, './')
  const outDir = path.resolve(appName)
  generate(generator, outDir)
}

function generate(generator, outDir) {
  sao({
    generator,
    outDir,
    npmClient: 'npm',
  })
    .run()
    .catch((error) => {
      console.trace(error)
      process.exit(1)
    })
}
