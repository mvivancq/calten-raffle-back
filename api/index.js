import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { constants } from "./utils/constants.js";
import {
  validate as validatePaymentReference,
  exposedSchema as exposedSchemaPaymentReference,
  mapToInternalSchema as mapToInternalSchemaPaymentReference,
} from "./Shemas/schemaPaymentReference.js";
import {
  validate as validatePutPaymentResult,
  exposedSchema as exposedSchemaPutPaymentResult,
  mapToInternalSchema as mapToInternalSchemaPutPaymentResult,
} from "./Shemas/schemaPutPaymentResult.js";
import axios from "axios";
import { savePaymentReference, putPaymentResult } from "./utils/databaseStorage.js";
import { sendCaltenEmail } from "./utils/emailSender.js";


dotenv.config();

const app = express();
const port = 3002;
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //use is for midleware
app.use(cors());

app.post(
  "/api/postPaymentReference",
  validatePaymentReference(exposedSchemaPaymentReference),
  async (req, res) => {
    const incomingExposedSchema = req.body;
    const internalSchema = mapToInternalSchemaPaymentReference(incomingExposedSchema);
    const stringName = internalSchema.name.replace(/ /g, '%20');
    const tokenOptions = {
      method: 'POST',
      url: `${process.env.AUTH0_DOMAIN}/oauth/token`, 
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE, 
        grant_type: "client_credentials"
      }
    };
    const tokenResponse = await axios(tokenOptions);
    const token = tokenResponse.data.access_token;
    const payload = {
      reference: 21,
      concept: `${internalSchema.numberOfTickets} boletos rifa Calten`,
      amount: internalSchema.numberOfTickets * constants.ticketPrice,
      callback: `${process.env.RAFFLEBACKEND}/api/putPaymentResult`,
      urlSuccess: `${process.env.RAFFLEFRONTEND}/success?name=${stringName}&email=${internalSchema.email}`,
      urlFailure: `${process.env.RAFFLEFRONTEND}?name=${stringName}&email=${internalSchema.email}&tickets=${internalSchema.numberOfTickets}&error=Hubo%20un%20error%20en%20tu%20pago,%20vuelve%20a%20intentarlo`
    }
    const api = process.env.CALTENAPI + constants.caltenApis.createRequest;
    const {data} = await axios.post(api, payload, {
      headers: 
      { 'Content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
      }
    }).then( val =>  {
      console.log(`success creating the payment`); 
      return val;
    })
    .catch(err => {
      console.log(`error creating the payment`);
      console.log(err);
      return res.status(500).json({});
    }); 
    if(!data)
      return;
    if(data.requestStatus !== 0)
      return res.status(500).json({});
    console.log(data);
    const payloaData = {
      paymentId: data.resultDetails.id,
      name: internalSchema.name,
      email: internalSchema.email,
      amount: payload.amount,
      tickets: internalSchema.numberOfTickets,
      status: -1,
    }
    const rows = await savePaymentReference(payloaData);
    const row = rows[0];
    console.log(row)

    res.send({ paymentId: data.resultDetails.id});
  }
);

app.put(
  "/api/putPaymentResult",
  validatePutPaymentResult(exposedSchemaPutPaymentResult),
  async (req, res) => {
    console.log(req.body);
    const incomingExposedSchema = req.body;
    const internalSchema = mapToInternalSchemaPutPaymentResult(incomingExposedSchema);
    console.log(internalSchema);
    const result = await putPaymentResult(internalSchema);
    if(!result || result.length < 1)
      return res.status(400).send('request not found');
    console.log(result);
    const response = { status: 0 }
    if(result[0].status === 1)
      sendCaltenEmail(result[0]);
    res.send(response);
  }
);

// app.post(
//   "/api/testEmail",
//   async (req, res) => {
//     console.log('sending email');
//     const purchaseData = {
//       name: 'Martin',
//       email: 'mavp98@hotmail.com'
//     }
//     sendCaltenEmail(purchaseData);
//     res.send('sent');
//   }
// );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
