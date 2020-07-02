const { createLogger, format, transports, info } = require('winston');



module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(
            info => `[${info.timestamp}] - [${info.level}] - [${info.message} ]`
        )),
        transports: [
            new transports.File({
                maxsize: 51200000,
                maxFiles: 5,
                filename: `${__dirname}/../logs/log-api.log`
            })
            
        ]
    })
    


