"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (to, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "p6h72na337tkzd4g@ethereal.email",
            pass: "Rnmb7SjNC35m41HZaR"
        }
    });
    let info = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>',
        to,
        subject: "Change password Request",
        html,
    });
    console.log("Message sent %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map