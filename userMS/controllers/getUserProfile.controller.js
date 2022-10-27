const invokeBackend = require('../middlewares/invokeBackend')
const log = require("../logger/logger")

const controller = {
    userProfile: async (req, res) => {
        log.info('userProfile controller started...');
        let userid = req.query.id

        log.info('userProfile controller parameters...', userid);
        let userProfileRes = await invokeBackend.userProfile(userid);
        try {            
            console.log("...........", userProfileRes)
            if (userProfileRes) {
                log.info("userProfile status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: userProfileRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: userProfileRes
                    }
                })
            } else {
                log.error("userProfile status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "userProfile not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "userProfile not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("userProfile status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    error:userProfileRes
                }
            }))
            res.status(404).json({
                content: {                    
                        error:userProfileRes                    
                }
            })
        }
    }
}


module.exports = controller