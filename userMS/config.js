const config = {
    DEV: {
        SQl: {
            HOST: "localhost",
            USER: "root",
            PASSWORD: "Root@123",
            DB: "tc_db",
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        PORT: 3000,
        logging: {
            name: "userMS-DEV",
            level: "debug",
            path: "./logs/server.%Y%m%d.log",
            sizeOflog: "250m"
        },
        secret: "bezkoder-secret-key",
        jwtExpiration: 3600,           // 1 hour
        jwtRefreshExpiration: 86400,   // 24 hours

        /* for test */
        // jwtExpiration: 60,          // 1 minute
        // jwtRefreshExpiration: 120,  // 2 minutes
    },
    UAT: {
        SQl: {
            HOST: "localhost",
            USER: "root",
            PASSWORD: "Root@123",
            DB: "tc_db",
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        logging: {
            name: "userMS-UAT",
            level: "debug",
            path: "./logs/server.%Y%m%d.log",
            sizeOflog: "250m"
        }

    },
    PROD: {
        SQl: {
            HOST: "localhost",
            USER: "root",
            PASSWORD: "Root@123",
            DB: "tc_db",
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        logging: {
            name: "userMS-PROD",
            level: "debug",
            path: "./logs/server.%Y%m%d.log",
            sizeOflog: "250m"
        }

    }
}

module.exports = config