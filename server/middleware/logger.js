const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFilename) => {
    const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        // Checking if the logs directory exists
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // Appending to the logFile
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFilename), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    // Log all requests incomming
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    
    next()
}

module.exports = { logEvents, logger }