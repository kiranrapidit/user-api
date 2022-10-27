const invokeBackend = require('../middlewares/invokeBackend')
const log = require("../logger/logger")

const controller = {
    login: async (req, res) => {
        log.info('login controller started...');
        let loginDetails = req.body

        log.info('login controller parameters...', loginDetails);
        let loginRes = await invokeBackend.loginUser(loginDetails);
        try {            
            console.log("...........", loginRes)
            if (loginRes) {
                log.info("Login status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: loginRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: loginRes
                    }
                })
            } else {
                log.error("Login status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "Login not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "Login not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("Login status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    error:loginRes
                }
            }))
            res.status(404).json({
                content: {                    
                        error:loginRes                    
                }
            })
        }
    }
}


module.exports = controller