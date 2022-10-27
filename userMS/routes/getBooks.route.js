const express = require('express')
const router = express.Router()

const getBooks_controller = require('../controllers/getBooks.controller')
// const schemas = require('../validator/schemas')
// const validator = require('../validator/validator')

router.post('/', getBooks_controller.getBooks)


module.exports = router