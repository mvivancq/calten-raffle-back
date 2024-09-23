import nodemailer from "nodemailer";
import fs from "fs";
import { constants } from "./constants.js";

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
    // Template 1
    // const htmlTemplate = fs.readFileSync('./api/emailTemplates/template1.html', 'utf-8');

    // const htmlContent = htmlTemplate
    //     .replace('{{name}}', purchaseData.name)
    //     .replaceAll('{{many}}', purchaseData.tickets > 1 ? 's' : '')
    //     .replace('{{num}}', 'numero234')
    //     .replace('{{tickets}}', purchaseData.tickets);

    // Template 2
    const htmlTemplate = fs.readFileSync('./api/emailTemplates/template2.html', 'utf-8');
    const emailData = constants.emails[Math.floor(Math.random() * 3)];

    const htmlContent = htmlTemplate
        .replaceAll('{{name}}', purchaseData.name)
        .replaceAll('{{member}}', emailData.member)
        .replace('{{team}}', emailData.team)
        .replace('{{photo}}', emailData.photo);

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