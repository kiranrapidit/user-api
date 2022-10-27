const express = require('express')
const router = express.Router()

const userProfile_controller = require('../controllers/updateUserProfile.controller')
const schemas = require('../validator/schemas')
const validator = require('../validator/validator')

router.put('/', validator(schemas.updateUserProfile, 'body'), userProfile_controller.updateUserProfile)


module.exports = router