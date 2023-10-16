const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require("express")
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT
require('./config/database.config')
const routes = require('./routes/routes')
const logger = require('./config/winston.config')
const {errorLogger} = require('./middleware/errorLogger')

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/link-up/v2', routes)
app.use(errorLogger)

const server = app.listen(port, ()=>{
    logger.info(`Link up database running on: http://127.0.0.1:${port}`)
})
module.exports = server