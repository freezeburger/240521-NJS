const morgan = require('morgan')
const path = require('path');
const fs = require('fs');

const PATH = '../../logs/'
const LOG_PATH = path.join(__dirname, PATH)

if (!fs.existsSync(LOG_PATH))fs.mkdirSync(LOG_PATH);


const accessLogStream = fs.createWriteStream( LOG_PATH + 'access.log', { flags: 'a' })

const logger = morgan('combined',  { stream: accessLogStream });

module.exports = logger;