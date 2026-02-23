const mongoose = require("mongoose");

const addressChangeSchema = new mongoose.Schema(
  {
    oldAddress: { type: String, required: true, trim: true },
    newAddress: { type: String, required: true, trim: true },
    reason: { type: String, trim: true },
    changedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    nic: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    address: { type: String, required: true, trim: true },
    previousCaseHistory: [{ type: String, trim: true }],
    lastAgeUpdatedYear: {
      type: Number,
      default: () => new Date().getUTCFullYear()
    },
    addressChangeHistory: [addressChangeSchema]
  },
  { timestamps: true, versionKey: false }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient };
