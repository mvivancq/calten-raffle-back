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
import { savePaymentReference, getPaymentResult, putPaymentResult } from "./utils/databaseStorage.js";

dotenv.config();

const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //use is for midleware
app.use(cors());

app.post(
  "/api/postPaymentReference",
  validatePaymentReference(exposedSchemaPaymentReference),
  async (req, res) => {
    const incomingExposedSchema = req.body;
    const internalSchema = mapToInternalSchemaPaymentReference(incomingExposedSchema);
    const payload = {
      reference: 21,
      concept: `${internalSchema.numberOfTickets} boletos rifa Calten`,
      amount: internalSchema.numberOfTickets * constants.ticketPrice,
      callback: "https://calten-raffle-back.vercel.app/api/putPaymentResult",
      urlSuccess: `https://calten-raffle.vercel.app/success/name=${internalSchema.name}&email=${internalSchema.email}`,
      urlFailure: `https://calten-raffle.vercel.app/name=${internalSchema.name}&email=${internalSchema.email}&tickets=${internalSchema.numberOfTickets}&error=Hubo%20un%20error%20en%20tu%20pago,%20vuelve%20a%20intentarlo`
    }
    const {data} = await axios.post(constants.caltenApisCreateRequest, payload, {
      headers: { 'Content-type': 'application/json; charset=UTF-8',}
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
    res.send(response);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
