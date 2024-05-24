const winston = require('winston');

const logger = (service = 'Anonymous Service') => winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Stream({stream:require('./tcp-stream')})
    ],
});

module.exports = logger;