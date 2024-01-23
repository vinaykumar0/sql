const express = require('express')
const { signUpValidator, loginValidator } = require('../helpers/validations')
const { signUp , login } = require('../controllers/userController')

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null,path.join(__dirname,'../public/image'))
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + '-' + file.originalname
//         cb(null,name)
//     }
// })

// const filefilter = (req, file, cb) => {
//     (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ?
//         cb(null,true):cb(null,false)
// }

// const upload=multer({storage:storage,fileFilter:filefilter})


const router = express.Router()

router.post('/signup', signUpValidator, signUp)
router.post('/login',loginValidator,login)

module.exports=router