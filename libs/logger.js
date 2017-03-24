/**
 * Logger
 */
const fs = require("fs");
const winston = require("winston");

// create logs folder if it does not exist
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

// log file parameters
module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/app.log",
      maxsize: 1048576,
      maxFiles: 10,
      colorize: false
    })
  ]
});