import nodemailer from "nodemailer"

export const sendEmail = async (to: string, html: string) => {

    // const testAccount = await nodemailer.createTestAccount()
    // console.log("test account %s", testAccount)

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "p6h72na337tkzd4g@ethereal.email",
            pass: "Rnmb7SjNC35m41HZaR"
        }
    })

    let info = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>',
        to,
        subject: "Change password Request",
        html,
    })

    console.log("Message sent %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}