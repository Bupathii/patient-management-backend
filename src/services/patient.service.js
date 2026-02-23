const { store } = require("../data/store");
const { Patient } = require("../models/patient.model");

function listPatients() {
  return store.patients;
}

function createPatient(payload) {
  const patient = new Patient(payload);
  store.patients.push(patient);
  return patient;
}

module.exports = {
  listPatients,
  createPatient
};
