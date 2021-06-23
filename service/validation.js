const Joi = require("joi");

const SchemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .required(),
});

const SchemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .optional(),
}).min(1);

const SchemaUpdateContactSatus = Joi.object({
  isfavorite: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    console.log("hello world");
    return next({
      status: 400,
      message: "Bad request",
    });
  }
  next();
};

module.exports.createContact = (req, _res, next) => {
  return validate(SchemaAddContact, req.body, next);
};

module.exports.updateContact = (req, _res, next) => {
  return validate(SchemaUpdateContact, req.body, next);
};
module.exports.updateContactStatus = (req, _res, next) => {
  return validate(SchemaUpdateContactSatus, req.body, next);
};
