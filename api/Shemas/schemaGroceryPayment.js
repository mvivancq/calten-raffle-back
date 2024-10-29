import yup from "yup";

const internalSchemaSkeleton = {
  items: "",
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
  internalSchema.items = exposedSchema.items;
  internalSchema.amount = exposedSchema.amount;

  return internalSchema;
}

export const exposedSchema = yup.object().shape({
  items: yup
  .string()
  .max(80, "Items must be at most 200 characters long")
  .required("Name is a required field"),

  amount: yup
  .number()
  .required("Amount is a required field"),

});
