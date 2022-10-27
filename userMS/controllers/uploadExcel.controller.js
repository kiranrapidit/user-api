const invokeBackend = require('../middlewares/invokeExcel')
const log = require("../logger/logger")

const controller = {
    uploadExcel: async (req, res) => {
        log.info('uploadExcel controller started...');
        console.log("----------",req.file)
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
      __basedir + "/uploads/" + req.file.filename;

        log.info('uploadExcel controller parameters...', path);
        let uploadExcelRes = await invokeBackend.uploadExcel(path);
        try {            
            console.log("...........", uploadExcelRes)
            if (uploadExcelRes) {
                log.info("uploadExcel status code :" + 200 + "status Response" + JSON.stringify({
                    content: {
                        esponse: uploadExcelRes
                    }
                }))
                res.status(200).send({
                    content: {
                        response: uploadExcelRes
                    }
                })
            } else {
                log.error("uploadExcel status code :" + 206 + "status Response" + JSON.stringify({
                    content: {
                        code: "206",
                        description: "uploadExcel not successfully"
                    }
                }))
                res.status(206).json({
                    content: {
                        error: {
                            code: "206",
                            description: "uploadExcel not successfully"
                        }
                    }
                })

            }
        }
        catch (error) {
            log.error("uploadExcel status code :" + 404 + "status Response" + JSON.stringify({
                content: {
                    error:uploadExcelRes
                }
            }))
            res.status(404).json({
                content: {                    
                        error:uploadExcelRes                    
                }
            })
        }
    }
}


module.exports = controller