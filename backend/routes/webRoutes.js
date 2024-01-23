const express = require('express')
const { verifyMail } = require('../controllers/userController')
const web = express()

web.set('view engine', 'ejs')
web.set('views', './views')
// web.use(express.static('public'))

web.get('/mailverification',verifyMail)

module.exports=web