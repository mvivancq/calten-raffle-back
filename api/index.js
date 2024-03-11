import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
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
    const reference = {
      reference: await savePaymentReference(internalSchema)
    } 
    res.send(reference);
  }
);

app.get(
  "/api/getPaymentResult",
  validatePaymentResult(exposedSchemaPaymentResult),
  async (req, res) => {
    const incomingExposedSchema = req.query;
    const internalSchema = mapToInternalSchemaPaymentResult(incomingExposedSchema);
    const reference = {
      paid: await getPaymentResult(internalSchema)
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
