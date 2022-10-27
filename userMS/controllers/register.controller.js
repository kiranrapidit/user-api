const invokeBackend = require('../middlewares/invokeBackend')
const log = require("../logger/logger")

const controller = {
    register: async (req, res) => {
        log.info('register controller started...');      

        const userdetails = req.body;

        log.info('register controller parameters...', userdetails);
        try {
            let registerRes = await invokeBackend.createUser(userdetails);
            console.log("...........",registerRes)
            if (registerRes) {
                log.info("registration status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: registerRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: registerRes
                    }
                })
            } else {
                log.error("registration status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "Registration not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "Registration not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("registration status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    code: "404",
                    description: "Registration not successfull"
                }
            }))
            res.status(404).json({
                content: {
                    error: {
                        code: "404",
                        description: "Registration not successfull"
                    }
                }
            })
        }
    }
}
module.exports = controller