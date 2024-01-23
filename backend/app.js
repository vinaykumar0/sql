const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./config/database')
const routes = require('./routes/userRoutes')
const webRoutes=require('./routes/webRoutes')


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(cors())


app.use('/api/v1', routes)
app.use('/',webRoutes)

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"
    res.status(err.statusCode).json({
        message:err.message
    })
})

app.listen(3000, () => {
    console.log(`Server is up and running on 3000`)
})