const db = require('../config/database')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const randomstring = require('randomstring')
const sendMail = require('../helpers/sendMail')
const jwt=require('jsonwebtoken')


exports.signUp = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() })
    }

    db.query(
        `SELECT * FROM users WHERE LOWER(email)=LOWER(${db.escape(
            req.body.email
        )})`,
        (err, result) => {
            if (result && result.length) {
                return res.status(401).send({
                    message: "User already exist"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(401).send({
                            message: err.message
                        })
                    } else {
                        db.query(
                            `INSERT INTO users (name,email,password) VALUES ('${req.body.name}',${db.escape(req.body.email)},
                            ${db.escape(hash)})`,
                            (err, result) => {
                                if (err) {
                                    return res.status(401).send({
                                        message: err
                                    })
                                }
                                let mailSubject = 'Mail Verification';
                                const randomToken = randomstring.generate()
                                let content = '<p>hii ' + req.body.email + 'Please <a href="http://localhost:3000/mailverification?token=' + randomToken + ' "> Verify</a> your mail'
                                sendMail(req.body.email, mailSubject, content)

                                db.query('UPDATE users set token=? where email=?', [randomToken, req.body.email], function (error, result, fields) {
                                    if (error) {
                                        return res.status(400).json({
                                            message: error
                                        })
                                    }
                                })
                                return res.status(200).json({
                                    message: "user created successfully"
                                })
                            }
                        )
                    }
                })
            }
        }
    )
}


exports.login = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() })
    }

    db.query(`SELECT * FROM users WHERE email= ${db.escape(req.body.email)}`,
        (err, result) => {
            if (err) {
                return res.status(401).send({ message: err })
            }
        
            if (!result.length) {
                return res.status(401).send({ message: "EMail or password is incorrect" })
            
            }
            bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
                if (bErr) {
                    return res.status(401).send({ message: err })
                }
                if (bResult) {
                    const token = jwt.sign({ id: result[0]['id'], is_admin: result[0]['is_admin'] }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' })
                    db.query(
                        `UPDATE users SET last_login = now() WHERE id='${result[0]['id']}'`
                    )
                    return res.status(200).send({
                        message: "loggin successfully",
                        token,
                        user:result[0]
                    })
                } 
                return res.status(401).send({ message: "EMail or password is incorrect" })

            })
        }
    )
}

exports.verifyMail = (req, res) => {
    var token = req.query.token
    console.log(token)

    db.query(`SELECT * FROM users WHERE token=?`, token, function (error, result, fields) {
        if (error) {
            console.log(error.message)
        }
        if (result.length > 0) {
            db.query(`UPDATE users SET token = null, is_verified = 1 WHERE id = '${result[0].id}'`)
            return res.render('mailverification', { message: 'Mail Verified Successfully' })
        }
        else {
            return res.render('404')
        }
    })
}