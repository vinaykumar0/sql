const { check } = require('express-validator')

exports.signUpValidator = [
    check('name', "name is required").isEmpty().not(),
    check('email', "please enter a valid email").isEmail(),
    check('password', "Password is required").isLength({ min: 6 }),
//     check('image').custom((value, { req }) => {
//         if (req.file.mimetype == 'image/jpeg' || 'image/png') {
//             return true
//         } else {
//             return false
//         }
//     }).withMessage("please upload an image type png and jpeg")
    
// ]
]
exports.loginValidator = [
    check('email', "Please enter a valid email").isEmail(),
    check('password', 'Plese enter the correct passsword').isLength({ min: 6 })
    
]