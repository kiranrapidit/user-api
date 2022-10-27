var loggingConfig = require("../config")[env].logging;
var bunyan = require('bunyan');
var RotatingFileStream = require('bunyan-rotating-file-stream');
var fs = require('fs');

fs.existsSync('logs')|| fs.mkdir('logs')

var logger = bunyan.createLogger({
    name: loggingConfig.name,
    streams: [
        {
        type: 'raw',
        stream: new RotatingFileStream({
            path: loggingConfig.path,
            period: '1d',          // daily rotation            
            rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
            threshold: loggingConfig.sizeOflog,      // Rotate log files larger than 10 megabytes
            totalSize: '20m',      // Don't keep more than 20mb of archived log files 
            template: "server.%Y%m%d.log"           
        })
    },
    {
        level:bunyan.INFO,
        stream:process.stdout
    }
]
});

module.exports=logger