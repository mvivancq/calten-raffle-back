import yup from "yup";

const internalSchemaSkeleton = {
  name: "",
  email: "",
  numberOfTickets: "",
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
  internalSchema.name = exposedSchema.name;
  internalSchema.email = exposedSchema.email;
  internalSchema.numberOfTickets = exposedSchema.numberOfTickets;

  return internalSchema;
}

export const exposedSchema = yup.object().shape({
  name: yup
    .string()
    .max(80, "Name must be at most 40 characters long"),

  email: yup
    .string()
    .max(80, "Name must be at most 40 characters long"),

  numberOfTickets: yup
    .number()
    .required("Number of tickets is a required field"),

});
