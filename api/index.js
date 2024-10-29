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
import {
  validate as validateGoceryPayment,
  exposedSchema as exposedSchemaGoceryPayment,
  mapToInternalSchema as mapToInternalSchemaGoceryPayment,
} from "./Shemas/schemaGroceryPayment.js";
import axios from "axios";
import { savePaymentReference, putPaymentResult } from "./utils/databaseStorage.js";
import { sendCaltenEmail } from "./utils/emailSender.js";
import { verifySign } from "./utils/sign-key.js";
import { logger } from "./utils/logger.js";
import { checkDomainConcept, checkEmailDomain } from "./utils/functions.js";


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
    try {
      const incomingExposedSchema = req.body;
      const internalSchema = mapToInternalSchemaPaymentReference(incomingExposedSchema);
      const stringName = encodeURIComponent(internalSchema.name); // More robust encoding
      
      // Fetch or cache token
      const token = await getToken();
      const ticketPrice = checkEmailDomain(internalSchema.email);
      const concept = checkDomainConcept(internalSchema.email);

      // Prepare payload for the API request
      const payload = {
        reference: 21,
        concept: concept,
        amount: internalSchema.numberOfTickets * ticketPrice,
        callback: `${process.env.RAFFLEBACKEND}/api/postPaymentResult`,
        urlSuccess: `${process.env.RAFFLEFRONTEND}/success?name=${stringName}&email=${internalSchema.email}`,
        urlFailure: `${process.env.RAFFLEFRONTEND}?name=${stringName}&email=${internalSchema.email}&tickets=${internalSchema.numberOfTickets}&error=Hubo%20un%20error%20en%20tu%20pago,%20vuelve%20a%20intentarlo`
      };

      // Make the request to the external API
      const api = process.env.CALTENAPI + constants.caltenApis.createRequest;
      const { data: result } = await axios.post(api, payload, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': `Bearer ${token}`
        }
      });

      // Save payment reference in the database
      const payloaData = {
        paymentId: result.data.id,
        name: internalSchema.name,
        email: internalSchema.email,
        amount: payload.amount,
        tickets: internalSchema.numberOfTickets,
        status: -1
      };

      const rows = await savePaymentReference(payloaData);
      const row = rows[0];
      logger.info(`Payment reference saved: ${row.paymentId}`);

      // Respond with the payment ID
      res.send({ paymentId: result.data.id });
    } catch (err) {
      logger.error('Error creating the payment', err);
      const result = {
        requestStatus: 500,
        statusMessage: 'Internal server error'
      };
      res.status(500).json(result);
    }
  }
);

app.post(
  "/api/postPaymentResult",
  validatePostPaymentResult(exposedSchemaPostPaymentResult),
  async (req, res) => {
    try {
      const incomingExposedSchema = req.body;

      // Verify the signature
      const isValidSignature = verifySign(
        incomingExposedSchema.signature, 
        JSON.stringify(incomingExposedSchema.data), 
        process.env.KEY_CALTEN64
      );

      if (!isValidSignature) {
        logger.warn('Invalid signature for payment result');
        const result = {
          requestStatus: 404,
          statusMessage: 'Invalid signature for payment result'
        };
        return res.status(404).json(result);
      }

      // Map the external schema to internal schema
      const internalSchema = mapToInternalSchemaPostPaymentResult(incomingExposedSchema);

      // Update payment result in the database
      const result = await putPaymentResult(internalSchema);
      
      if (!result || result.length < 1) {
        logger.warn(`Payment result not found for id: ${internalSchema.id}`);
        const result = {
          requestStatus: 400,
          statusMessage: 'Request not found'
        };
        return res.status(404).json(result);
      }

      // Send a response
      const response = { status: 200 };

      // If the payment is successful (status 1), send a confirmation email
      if (result[0].status === 1) {
        await sendCaltenEmail(result[0]);
      }

      res.send(response);
    } catch (err) {
      logger.error('Error processing payment result', err);
      const result = {
        requestStatus: 500,
        statusMessage: 'Internal server error'
      };
      res.status(500).json(result);
    }
  }
);

app.post(
  "/api/postGroceryPayment",
  validateGoceryPayment(exposedSchemaGoceryPayment),
  async (req, res) => {
    try {
      const incomingExposedSchema = req.body;
      const internalSchema = mapToInternalSchemaGoceryPayment(incomingExposedSchema);
      
      // Fetch or cache token
      const token = await getToken();

      // Prepare payload for the API request
      const payload = {
        reference: 21,
        concept: "pago de mercado",
        amount: internalSchema.amount,
        //callback: `${process.env.RAFFLEBACKEND}/api/postPaymentResult`,
        urlSuccess: `test/success`,
        urlFailure: `test/failure`
      };

      // Make the request to the external API
      const api = process.env.CALTENAPI + constants.caltenApis.createRequest;
      const { data: result } = await axios.post(api, payload, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': `Bearer ${token}`
        }
      });

      // Respond with the payment ID
      res.send({ paymentId: result.data.id });
    } catch (err) {
      logger.error('Error creating the payment', err);
      const result = {
        requestStatus: 500,
        statusMessage: 'Internal server error'
      };
      res.status(500).json(result);
    }
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
