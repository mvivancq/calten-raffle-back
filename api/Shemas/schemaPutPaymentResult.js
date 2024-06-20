import yup from "yup";

const internalSchemaSkeleton = {
  reference: 0,
  amount: 0,
  id: 0,
  status: 0,
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
  internalSchema.status = exposedSchema.status;
  internalSchema.amount = exposedSchema.amount;
  internalSchema.reference = exposedSchema.reference;
  internalSchema.id = exposedSchema.id;

  return internalSchema;
}

export const exposedSchema = yup.object().shape({
  status: yup
    .number()
    .required("Payment status required field"),

  amount: yup
    .number()
    .required("Amount paid is a required field"),
  
  reference: yup
    .number()
    .required("Reference is a required field"),
    
  id: yup
    .number()
    .required("ID is a required field"),

});
