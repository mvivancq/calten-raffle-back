import nodemailer from "nodemailer";
import fs from "fs";
import { constants } from "./constants.js";
import { logger } from "./logger.js";

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
    try {
      logger.info('Sending email for purchase');
      // Template 1
      // const htmlTemplate = fs.readFileSync('./api/emailTemplates/template1.html', 'utf-8');

      // const htmlContent = htmlTemplate
      //     .replace('{{name}}', purchaseData.name)
      //     .replaceAll('{{many}}', purchaseData.tickets > 1 ? 's' : '')
      //     .replace('{{num}}', 'numero234')
      //     .replace('{{tickets}}', purchaseData.tickets);

      // Template 2
      const htmlTemplate = fs.readFileSync('./api/emailTemplates/template2.html', 'utf-8');
      
      // Random email data from constants
      const emailData = constants.emails[Math.floor(Math.random() * 3)];
  
      // Replace placeholders with actual data in the template
      const htmlContent = htmlTemplate
        .replaceAll('{{name}}', purchaseData.name)
        .replaceAll('{{member}}', emailData.member)
        .replace('{{team}}', emailData.team)
        .replace('{{photo}}', emailData.photo);
  
      // Mail options for nodemailer
      const mailOptions = {
        from: process.env.CALTENMAIL,
        to: purchaseData.email,
        subject: 'Compra boletos Rifa Calten',
        html: htmlContent,
      };
  
      // Send email via nodemailer
      const info = await transporter.sendMail(mailOptions);
  
      // Log successful email send
      logger.info(`Email sent successfully to ${purchaseData.email}: ${info.response}`);
      return { success: true, message: `Email sent: ${info.response}` };
  
    } catch (error) {
      // Handle file reading or email sending errors
      logger.error(`Error sending email: ${error.message}`);
      return { success: false, message: `Failed to send email: ${error.message}` };
    }
  };