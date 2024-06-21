import nodemailer from "nodemailer";

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
    var mailOptions = {
        from: process.env.CALTENMAIL,
        to: purchaseData.email,
        subject: 'Compra boletos Rifa Calten',
        //text: `Gracias ${purchaseData.name} por la compra de ${purchaseData.tickets} boletos para la rifa`,
        html: `<h1>Gracias ${purchaseData.name}</h1>
        <p>Compra de ${purchaseData.tickets} boletos para la rifa</p>
        <img src=\"https://calten-raffle.vercel.app/assets/calten-D3byka7V.png\" width="400" alt="calten logo">`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}