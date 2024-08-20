import nodemailer from "nodemailer";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.CALTENMAIL,
    pass: process.env.CALTENPW
  }
});

export const sendCaltenEmail = async (purchaseData) => {
    const htmlTemplate = fs.readFileSync('./api/utils/emailTemplate.html', 'utf-8');

    const htmlContent = htmlTemplate
        .replace('{{name}}', purchaseData.name)
        .replace('{{many}}', purchaseData.tickets > 1 ? 's' : '')
        .replace('{{many}}', purchaseData.tickets > 1 ? 's' : '')
        .replace('{{num}}', 'numero234')
        .replace('{{tickets}}', purchaseData.tickets);

    var mailOptions = {
        from: process.env.CALTENMAIL,
        to: purchaseData.email,
        subject: 'Compra boletos Rifa Calten',
        html: htmlContent
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}