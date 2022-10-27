env = process.env.NODE_ENV || "DEV";
const config = require("./config")[env];
const express = require('express');
const app = express();
const cors = require('cors');
// set port, listen for requests
const PORT = config.PORT || 3000;
const actuator = require('express-actuator');
// Sql Sequelize 
const Sequelize = require("sequelize");
global.__basedir = __dirname + "/";


const log = require("./logger/logger")
const db = require("./models/db.config")
const { authenticateToken } = require("./middlewares/authenticate")

db.sequelize.sync()
  .then(() => {
    log.info("Synced db.");
  })
  .catch((err) => {
    log.info("Failed to sync db: " + err.message);
  });
  

async function startServer() {
    app.use(cors());
    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    const loginRoute = require('./routes/login.route')
    app.use('/api/login', loginRoute)

    const registerRoute = require('./routes/register.route')
    app.use('/api/register', registerRoute)


    const userProfileRoute = require('./routes/getUserProfile.route')
    app.use('/api/getUserProfile',authenticateToken, userProfileRoute)
    

    const updateUserProfile = require('./routes/updateUserProfile.route')
    app.use('/api/updateUserProfile',authenticateToken, updateUserProfile)

    //excel
    const uploadExcel = require('./routes/uploadExcel.route')
    app.use('/api/uploadExcel',authenticateToken, uploadExcel)

    const getExceldata = require('./routes/getBooks.route')
    app.use('/api/getExceldata',authenticateToken, getExceldata)

    const options = {
        basePath: 'api/userMs', // It will set /management/info instead of /info
        infoGitMode: 'full', // the amount of git information you want to expose, 'simple' or 'full',
        infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
        infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
        customEndpoints: [
            {
                id: '/api/login', // used as endpoint /dependencies or ${basePath}/dependencies
                // controller: (req, res) => { // Controller to be called when accessing this endpoint
                //     // Your custom code here
                // }
                controller: app.use('/api/login', loginRoute)
            },
            {
                id: '/api/register',
                controller: app.use('/api/register', registerRoute)
            },
            {
                id: '/api/getUserProfile',
                controller: app.use('/api/getUserProfile', userProfileRoute)
            },
            {
                id: '/api/updateUserProfile',
                controller: app.use('/api/updateUserProfile', updateUserProfile)
            },
            {
                id: '/api/uploadExcel',
                controller: app.use('/api/uploadExcel', uploadExcel)
            },
            {
                id: '/api/getExceldata',
                controller: app.use('/api/getExceldata', getExceldata)
            }
        ] // array of custom endpoints
    };

    app.use(actuator(options));

    //auth server
    app.use(authenticateToken)

    app.listen(PORT, () => {
        log.info(`UserMs started listing PORT ${PORT}`)

    })
}
startServer()
module.exports = app

