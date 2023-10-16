const mongoose = require('mongoose')

const logger = require('./winston.config')

mongoose.connect(process.env.DB_URI)

mongoose.connection.once('open', ()=>{
    logger.info(`Database server connected successfully`)
}).on('error', (error)=>{
    logger.error(error.message, error)
})



