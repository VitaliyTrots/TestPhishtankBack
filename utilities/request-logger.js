const expressWinston = require('express-winston');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const logDir = 'logs';

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

module.exports = app => {
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join('logs', 'combined.log'),
          format: winston.format.simple()
        })
      ],
      meta: false,
      format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
      expressFormat: true,
      colorize: true
    })
  );
};
