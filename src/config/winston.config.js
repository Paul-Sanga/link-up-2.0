const winston = require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.json(),
  defaultMeta: {service: 'link-up-api-service'},
  transports: [
    new winston.transports.File({filename: 'combined.log'}),
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.MongoDB({
        db: process.env.DB_LOGS,
        options: {
            useUnifiedTopology: true
        }
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({filename: 'rejections.log'}),
    new winston.transports.MongoDB({
        db: process.env.DB_REJECTIONS_LOGS_URI,
        options: {
            useUnifiedTopology: true
        }
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({filename: 'exceptions.log'}),
    new winston.transports.MongoDB({
        db: process.env.DB_EXCEPTIONS_LOGS_URI,
        options: {
            useUnifiedTopology: true
        }
    })
  ]
})

module.exports = logger