const express = require('express')
const router = express.Router()

const userProfile_controller = require('../controllers/getUserProfile.controller')
const schemas = require('../validator/schemas')
const validator = require('../validator/validator')

router.get('/', validator(schemas.getUserProfile, 'query'), userProfile_controller.userProfile)


module.exports = router