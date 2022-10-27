const express = require('express')
const router = express.Router()

const login_controller = require('../controllers/login.controller')
const schemas = require('../validator/schemas')
const validator = require('../validator/validator')

router.post('/', validator(schemas.login, 'body'), login_controller.login)


module.exports = router