const nodemailer = require('nodemailer')

const sendMail = async (email, mailSubject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass:process.env.SMTP_PASSWORD
        }
        })

        const mailtOption = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html:content
        }

        transporter.sendMail(mailtOption, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log("Mail send successfully",info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=sendMail