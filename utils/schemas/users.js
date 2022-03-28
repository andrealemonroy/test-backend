const joi = require("joi");
const userDocumentNumber = joi.string();
const userPhoneNumber = joi.string();
const userCarNumber = joi.string();
const createUserSchema = {
  documentNumber: userDocumentNumber.required(),
  phoneNumber: userPhoneNumber.required(),
  carNumber: userCarNumber.required(),
};

module.exports = {
  createUserSchema,
};
