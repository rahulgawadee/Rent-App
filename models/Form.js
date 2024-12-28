// models/FormData.js
const mongoose = require('mongoose');

// Define the schema for the form data
const formDataSchema = new mongoose.Schema({
  step1: {
    propertyAddress: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    birthDate: { type: String, default: "" },
    socialSecurity: { type: String, default: "" },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    driversLicense: { type: String, default: "" },
  },
  step2: {
    occupants: [
      {
        name: { type: String, required: true },
        dob: { type: String, required: true },
        relationship: { type: String, required: true },
      },
    ],
    housingVoucher: { type: String, default: "" },
    priorAddress: { type: String, required: true },
    monthlyRent: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    reasonForMoving: { type: String, default: "" },
    ownerManagerName: { type: String, default: "" },
    ownerManagerPhone: { type: String, default: "" },
  },
  step3: {
    employers: [
      {
        employerName: { type: String, required: true },
        occupation: { type: String, required: true },
        employerAddress: { type: String, required: true },
        employerPhone: { type: String, required: true },
        startDate: { type: String, required: true },
        monthlyPay: { type: String, required: true },
        supervisorName: { type: String, required: true },
      },
    ],
  },
  step4: {
    financialDetails: [
      {
        type: { type: String, default: "Checking Account" },
        bank: { type: String, required: true },
        balance: { type: String, required: true },
      },
    ],
  },
  step5: {
    references: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        relationship: { type: String, required: true },
      },
    ],
    backgroundInfo: {
      lateRent: { type: String, default: "" },
      lawsuit: { type: String, default: "" },
      smoke: { type: String, default: "" },
      pets: { type: String, default: "" },
    },
  },
  step6: {
    comments: { type: String, default: "" },
  },
});

// Create the model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
