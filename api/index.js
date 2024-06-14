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
  validate as validatePaymentResult,
  exposedSchema as exposedSchemaPaymentResult,
  mapToInternalSchema as mapToInternalSchemaPaymentResult,
} from "./Shemas/schemaPaymentResult.js";
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
      callback: "https://www.banxico.org.mx/RegistroCoDi-Beta/",
      urlSuccess: "https://www.google.com/search?q=success",
      urlFailure: "https://www.google.com/search?q=failure"
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
    }
    const rows = await savePaymentReference(payloaData);
    const row = rows[0];
    console.log(row)

    res.send({ paymentId: data.resultDetails.id});
  }
);

app.get(
  "/api/getPayment",
  validatePaymentResult(exposedSchemaPaymentResult),
  async (req, res) => {
    const incomingExposedSchema = req.query;
    const internalSchema = mapToInternalSchemaPaymentResult(incomingExposedSchema);
    const rows = await getPaymentResult(internalSchema);
    const row = rows[0];
    const reference = {
      paid: row.status
    } 
    res.send(reference);
  }
);

app.put(
  "/api/putPaymentResult",
  validatePutPaymentResult(exposedSchemaPutPaymentResult),
  async (req, res) => {
    console.log(req.body);
    const incomingExposedSchema = req.body;
    const internalSchema = mapToInternalSchemaPutPaymentResult(incomingExposedSchema);
    await putPaymentResult(internalSchema);
    console.log(internalSchema);
    const response = { status: 'success' }
    res.send(response);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
