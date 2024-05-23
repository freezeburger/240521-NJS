const morgan = require('morgan')
const path = require('path');
const fs = require('fs');

const TEN_HOURS = 36000000;
const PATH = '../../logs/'
const LOG_PATH = path.join(__dirname, PATH)


let  FILENAME = `${ (new Date()).toISOString()}-access.log`
if (!fs.existsSync(LOG_PATH))fs.mkdirSync(LOG_PATH);

const accessLogStream = fs.createWriteStream( LOG_PATH + FILENAME, { flags: 'a' })

const logger = morgan('combined',  { stream: accessLogStream });

module.exports = logger;