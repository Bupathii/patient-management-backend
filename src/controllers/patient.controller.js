const patientService = require("../services/patient.service");

function getPatients(req, res) {
  const patients = patientService.listPatients();
  res.status(200).json({ data: patients });
}

function postPatient(req, res) {
  const patient = patientService.createPatient(req.body);
  res.status(201).json({ data: patient });
}

function updateAgesAutomatically(req, res) {
  res.status(501).json({
    message: "TODO: Implement automatic yearly age update function."
  });
}

function requestAddressChange(req, res) {
  res.status(501).json({
    message: "TODO: Implement patient address change request handling."
  });
}

module.exports = {
  getPatients,
  postPatient,
  updateAgesAutomatically,
  requestAddressChange
};
