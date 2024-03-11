import yup from "yup";

const internalSchemaSkeleton = {
  status: 0,
  amount: 0,
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

  return internalSchema;
}

export const exposedSchema = yup.object().shape({
  result: yup
    .number()
    .required("Payment status required field"),

  amount: yup
    .number()
    .required("Amount paid is a required field"),

});
