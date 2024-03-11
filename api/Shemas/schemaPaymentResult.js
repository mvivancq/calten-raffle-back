import yup from "yup";

const internalSchemaSkeleton = {
  reference: 0
};

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.query);
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export function mapToInternalSchema(exposedSchema) {
  const internalSchema = { ...internalSchemaSkeleton };
  internalSchema.reference = exposedSchema.reference;

  return internalSchema;
}

export const exposedSchema = yup.object().shape({
  reference: yup
    .number()
    .required("Payment reference is a required field"),

});
