const express = require('express')
const useController = require('../Controllers/userController')

const router = new express.Router()


//register
router.post('/register',useController.register)

//export router
module.exports = router