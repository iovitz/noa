const { writeFileSync } = require('node:fs')
const process = require('node:process')

const envPrefix = 'NOA_ENV_'

const env = process.env

const appEnv = Object.keys(env).filter(k => k.startsWith(envPrefix))

const productionEnv = {}

appEnv.forEach((k) => {
  const newKey = k.replace(envPrefix, '')
  productionEnv[newKey] = env[k]
})

writeFileSync('./config/production.json', JSON.stringify(productionEnv, null, 2))
