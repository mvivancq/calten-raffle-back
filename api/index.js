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
  validate as validatePostPaymentResult,
  exposedSchema as exposedSchemaPostPaymentResult,
  mapToInternalSchema as mapToInternalSchemaPostPaymentResult,
} from "./Shemas/schemaPostPaymentResult.js";
import axios from "axios";
import { savePaymentReference, putPaymentResult } from "./utils/databaseStorage.js";
import { sendCaltenEmail } from "./utils/emailSender.js";
import { verifySign } from "./utils/sign-key.js";


dotenv.config();

const app = express();
const port = 3002;
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //use is for midleware
app.use(cors());

let cachedToken = null;
let tokenExpirationTime = null; // To store the expiration time

// Function to get the token, refreshing it only if necessary
const getToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  // Check if the token is cached and still valid
  if (cachedToken && tokenExpirationTime && currentTime < tokenExpirationTime) {
    return cachedToken; // Return the cached token if it's still valid
  }

  // If no valid token exists, request a new one
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

  // Calculate the expiration time (current time + expires_in seconds)
  const expiresIn = tokenResponse.data.expires_in; // usually 3600 seconds (1 hour)
  tokenExpirationTime = currentTime + expiresIn - 60; // Subtract 60 seconds for buffer

  cachedToken = token; // Cache the new token
  return token;
};

// Your API handler
app.post(
  "/api/postPaymentReference",
  validatePaymentReference(exposedSchemaPaymentReference),
  async (req, res) => {
    const incomingExposedSchema = req.body;
    const internalSchema = mapToInternalSchemaPaymentReference(incomingExposedSchema);
    const stringName = internalSchema.name.replace(/ /g, '%20');

    try {
      const token = await getToken(); // Get the token (cached or new)

      const payload = {
        reference: 21,
        concept: `${internalSchema.numberOfTickets} boletos rifa Calten`,
        amount: internalSchema.numberOfTickets * constants.ticketPrice,
        callback: `${process.env.RAFFLEBACKEND}/api/postPaymentResult`,
        urlSuccess: `${process.env.RAFFLEFRONTEND}/success?name=${stringName}&email=${internalSchema.email}`,
        urlFailure: `${process.env.RAFFLEFRONTEND}?name=${stringName}&email=${internalSchema.email}&tickets=${internalSchema.numberOfTickets}&error=Hubo%20un%20error%20en%20tu%20pago,%20vuelve%20a%20intentarlo`
      };

      const api = process.env.CALTENAPI + constants.caltenApis.createRequest;
      const { data } = await axios.post(api, payload, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': `Bearer ${token}`
        }
      });

      if (!data || data.requestStatus !== 0) {
        return res.status(500).json({});
      }

      const payloaData = {
        paymentId: data.resultDetails.id,
        name: internalSchema.name,
        email: internalSchema.email,
        amount: payload.amount,
        tickets: internalSchema.numberOfTickets,
        status: -1,
      };

      const rows = await savePaymentReference(payloaData);
      const row = rows[0];
      console.log(row);

      res.send({ paymentId: data.resultDetails.id });
    } catch (err) {
      console.log("Error creating the payment", err);
      res.status(500).json({});
    }
  }
);

app.post(
  "/api/postPaymentResult",
  validatePostPaymentResult(exposedSchemaPostPaymentResult),
  async (req, res) => {
    const incomingExposedSchema = req.body;
    if( !verifySign(incomingExposedSchema.signature, JSON.stringify(incomingExposedSchema.data), process.env.KEY_CALTEN64)) {
      return res.status(404).json({ status: 1 });
    }
    const internalSchema = mapToInternalSchemaPostPaymentResult(incomingExposedSchema);
    const result = await putPaymentResult(internalSchema);
    if(!result || result.length < 1)
      return res.status(400).send('request not found');
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
