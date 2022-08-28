const nodemailer = require("nodemailer");
const { emailTemplate } = require("./email-html");

const sendCode = async (email, code, title) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER_EMAIL, // generated ethereal user
                pass: process.env.PASS_EMAIL, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `MOVIKE 🚲 <movike.ar@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: emailTemplate(email, code, title),
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        console.log(error);
        throw new Error('Error al generar el codigo de verificación');
    }
}

module.exports = {
    sendCode
}