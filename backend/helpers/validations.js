const { check } = require('express-validator')

exports.signUpValidator = [
    check('name', "name is required").isEmpty().not(),
    check('email', "please enter a valid email").isEmail(),
    check('password', "Password is required").isLength({ min: 6 }),

]
exports.loginValidator = [
    check('email', "Please enter a valid email").isEmail(),
    check('password', 'Plese enter the correct passsword').isLength({ min: 6 })
    
]
