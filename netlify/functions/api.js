const serverless = require('serverless-http')
const app = require('../../fake-api/server')

exports.handler = serverless(app)
