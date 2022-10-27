const invokeBackend = require('../middlewares/invokeExcel')
const log = require("../logger/logger")

const controller = {
    excel: async (req, res) => {
        log.info('excel controller started...');
        let userid = req.query.id

        log.info('excel controller parameters...', userid);
        let excelRes = await invokeBackend.exceldownload(userid);
        try {            
            console.log("...........", excelRes)
            if (excelRes) {
                log.info("excel status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: excelRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: excelRes
                    }
                })
            } else {
                log.error("excel status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "excel not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "excel not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("excel status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    error:excelRes
                }
            }))
            res.status(404).json({
                content: {                    
                        error:excelRes                    
                }
            })
        }
    }
}


module.exports = controller