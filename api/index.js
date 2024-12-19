const app = require('./server')
const { createServer } = require('@vercel/node')

module.exports = createServer(app)
