const express = require('express')
const router = express.Router()
const upload = require("../middlewares/upload");

const uploadExcel_controller = require('../controllers/uploadExcel.controller')
// const schemas = require('../validator/schemas')
// const validator = require('../validator/validator')

router.post('/', upload.single("file"), uploadExcel_controller.uploadExcel)


module.exports = router