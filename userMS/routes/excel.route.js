const express = require('express')
const router = express.Router()

const excel_controller = require('../controllers/excel.controller')
// const schemas = require('../validator/schemas')
// const validator = require('../validator/validator')

router.get('/', excel_controller.excel)


module.exports = router