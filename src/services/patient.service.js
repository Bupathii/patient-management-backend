const { Patient } = require("../models/patient.model");

async function listPatients() {
  return Patient.find().sort({ createdAt: -1 });
}

async function createPatient(payload) {
  return Patient.create(payload);
}

async function autoUpdateAges() {
  const currentYear = new Date().getUTCFullYear();

  const patientsToUpdate = await Patient.find({
    lastAgeUpdatedYear: { $lt: currentYear }
  });

  if (patientsToUpdate.length === 0) {
    return { updatedCount: 0, currentYear };
  }

  const bulkOperations = patientsToUpdate.map((patient) => {
    const yearsToAdd = currentYear - patient.lastAgeUpdatedYear;

    return {
      updateOne: {
        filter: { _id: patient._id },
        update: {
          $inc: { age: yearsToAdd },
          $set: { lastAgeUpdatedYear: currentYear }
        }
      }
    };
  });

  const result = await Patient.bulkWrite(bulkOperations);

  return {
    updatedCount: result.modifiedCount || 0,
    currentYear
  };
}

async function handleAddressChange(patientId, newAddress, reason) {
  const patient = await Patient.findOne({ patientId });

  if (!patient) {
    const error = new Error("Patient not found.");
    error.statusCode = 404;
    throw error;
  }

  if (patient.address === newAddress) {
    const error = new Error("New address must be different from current address.");
    error.statusCode = 400;
    throw error;
  }

  patient.addressChangeHistory.push({
    oldAddress: patient.address,
    newAddress,
    reason: reason || ""
  });
  patient.address = newAddress;

  await patient.save();

  return patient;
}

module.exports = {
  listPatients,
  createPatient,
  autoUpdateAges,
  handleAddressChange
};
