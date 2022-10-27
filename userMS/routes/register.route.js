const express = require('express')
const router = express.Router()

const register_controller = require('../controllers/register.controller')
const schemas = require('../validator/schemas')
const validator = require('../validator/validator')

router.post('/', validator(schemas.register, 'body'), register_controller.register)


module.exports = router