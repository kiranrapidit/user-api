const invokeBackend = require('../middlewares/invokeBackend')
const log = require("../logger/logger")

const controller = {
    updateUserProfile: async (req, res) => {
        log.info('updateUserProfile controller started...');
        let userdetails = req.body

        log.info('updateUserProfile controller parameters...', userdetails);
        let updateUserProfileRes = await invokeBackend.updateUserProfile(userdetails);
        try {            
            console.log("...........", updateUserProfileRes)
            if (updateUserProfileRes) {
                log.info("updateUserProfile status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: updateUserProfileRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: updateUserProfileRes
                    }
                })
            } else {
                log.error("updateUserProfile status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "updateUserProfile not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "updateUserProfile not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("updateUserProfile status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    error:updateUserProfileRes
                }
            }))
            res.status(404).json({
                content: {                    
                        error:updateUserProfileRes                    
                }
            })
        }
    }
}


module.exports = controller