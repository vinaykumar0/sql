const express = require('express')
const { signUpValidator, loginValidator } = require('../helpers/validations')
const { signUp , login } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signUpValidator, signUp)
router.post('/login',loginValidator,login)

module.exports=router
