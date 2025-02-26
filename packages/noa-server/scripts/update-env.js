const { writeFileSync } = require('node:fs')
const process = require('node:process')
const data = require('./config/default.json')

const envPrefix = 'NOA_APP_'

const env = process.env

const appEnv = Object.keys(env).filter(k => k.startsWith(envPrefix))

appEnv.forEach((k) => {
  const newKey = k.replace(envPrefix, '')
  data[newKey] = env[k]
})

writeFileSync('./config/default.json', JSON.stringify(data))
