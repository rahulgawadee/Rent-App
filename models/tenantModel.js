const mongoose = require("mongoose");

const OccupantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  relationship: { type: String, required: true },
});

const EmployerSchema = new mongoose.Schema({
  employerName: { type: String, required: true },
  occupation: { type: String, required: true },
  employerAddress: { type: String, required: true },
  employerPhone: { type: String, required: true },
  startDate: { type: Date, required: true },
  monthlyPay: { type: Number, required: true },
  supervisorName: { type: String, required: true },
});

const FinancialDetailSchema = new mongoose.Schema({
  type: { type: String, required: true },
  bank: { type: String, required: true },
  balance: { type: Number, required: true },
});

const ReferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relationship: { type: String, required: true },
});

const BackgroundInfoSchema = new mongoose.Schema({
  lateRent: { type: String, required: true },
  lawsuit: { type: String, required: true },
  smoke: { type: String, required: true },
  pets: { type: String, required: true },
});

const TenantForm = new mongoose.Schema({
  step1: {
    propertyAddress: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    socialSecurity: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    driversLicense: { type: String, required: true },
  },
  step2: {
    occupants: [OccupantSchema],
    housingVoucher: { type: String },
    priorAddress: { type: String },
    monthlyRent: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    reasonForMoving: { type: String },
    ownerManagerName: { type: String },
    ownerManagerPhone: { type: String },
  },
  step3: {
    employers: [EmployerSchema],
  },
  step4: {
    financialDetails: [FinancialDetailSchema],
  },
  step5: {
    references: [ReferenceSchema],
    backgroundInfo: BackgroundInfoSchema,
  },
  step6: {
    comments: { type: String },
  },
});

module.exports = mongoose.model("Form", TenantForm);
