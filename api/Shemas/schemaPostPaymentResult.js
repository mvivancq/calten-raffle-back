import yup from "yup";

const internalSchemaSkeleton = {
  reference: 0,
  amount: 0,
  id: '',
  idCodi: '',
  cellphone: '',
  beneficiaryName: '',
  beneficiaryAccount: '',
  concept: '',
  trackingKey: '',
  status: -1,
  timeSent: '',
  timeProcessed: '',
  timeLastUpdate: ''
};

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export function mapToInternalSchema(exposedSchema) {
  const internalSchema = { ...internalSchemaSkeleton };
  
  internalSchema.id = exposedSchema.data.id;
  internalSchema.idCodi = exposedSchema.data.idCodi;
  internalSchema.cellphone = exposedSchema.data.cellphone;
  internalSchema.reference = exposedSchema.data.reference;
  internalSchema.beneficiaryName = exposedSchema.data.beneficiaryName;
  internalSchema.beneficiaryAccount = exposedSchema.data.beneficiaryAccount;
  internalSchema.concept = exposedSchema.data.concept;
  internalSchema.amount = exposedSchema.data.amount;
  internalSchema.trackingKey = exposedSchema.data.trackingKey;
  internalSchema.status = exposedSchema.data.status;
  internalSchema.timeSent = exposedSchema.data.timeSent;
  internalSchema.timeProcessed = exposedSchema.data.timeProcessed;
  internalSchema.timeLastUpdate = exposedSchema.data.timeLastUpdate;

  return internalSchema;
}

export const exposedSchema = yup.object().shape({
  data: yup.object().shape({
    id: yup
      .string()
      .required("ID is a required field"),
    
    idCodi: yup
      .string()
      .required("idCodi is a required field"),

    cellphone: yup
      .string()
      .length(10, "Cellphone must be exactly 10 characters long")
      .required("Cellphone is a required field"),

    reference: yup
      .number()
      .required("Reference is a required field"),

    beneficiaryName: yup
      .string()
      .required("Beneficiary Name is a required field"),

    beneficiaryAccount: yup
      .string()
      .required("Beneficiary Account is a required field"),

    concept: yup
      .string()
      .required("Concept is a required field"),

    amount: yup
      .number()
      .required("Amount is a required field"),

    trackingKey: yup
      .string()
      .required("Tracking Key is a required field"),

    status: yup
      .number()
      .required("Status is a required field"),

    timeSent: yup
      .date()
      .nullable(true)
      .required("Time Sent is a required field"),

    timeProcessed: yup
      .date()
      .nullable(true),  // Nullable in case it's not processed yet

    timeLastUpdate: yup
      .date()
      .nullable(true)  // Nullable as it may not be updated yet
  }),

  statusMessage: yup
    .string()
    .required("Status Message is a required field"),

  signature: yup
    .string()
    .required("Signature is a required field")
});
