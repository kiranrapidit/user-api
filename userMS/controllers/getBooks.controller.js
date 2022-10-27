const invokeBackend = require('../middlewares/invokeExcel')
const log = require("../logger/logger")

const controller = {
    getBooks: async (req, res) => {
        log.info('getBooks controller started...');
        let getBooksRes = await invokeBackend.getBooks();
        try {            
            console.log("...........", getBooksRes)
            if (getBooksRes) {
                log.info("getBooks status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: getBooksRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: getBooksRes
                    }
                })
            } else {
                log.error("getBooks status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "getBooks not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "getBooks not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("getBooks status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    error:getBooksRes
                }
            }))
            res.status(404).json({
                content: {                    
                        error:getBooksRes                    
                }
            })
        }
    }
}


module.exports = controller