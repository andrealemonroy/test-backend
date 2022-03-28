const joi = require("joi");
const userDocumentNumber = joi.number().max(8);
const userPhoneNumber = joi.number().max(9);
const userCarNumber = joi.string().max(7);
const createUserSchema = {
  documentNumber: userDocumentNumber.required(),
  phoneNumber: userPhoneNumber.required(),
  carNumber: userCarNumber.required(),
};

module.exports = {
  createUserSchema,
};
