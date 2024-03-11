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
import { savePaymentReference, getPaymentResult } from "./utils/databaseStorage.js";

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
