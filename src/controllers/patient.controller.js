const patientService = require("../services/patient.service");

async function getPatients(req, res, next) {
  try {
    const patients = await patientService.listPatients();
    res.status(200).json({ data: patients });
  } catch (error) {
    next(error);
  }
}

async function postPatient(req, res, next) {
  try {
    const { patientId, name, nic, age, address } = req.body;

    if (!patientId || !name || !nic || age === undefined || !address) {
      const error = new Error(
        "Required fields: patientId, name, nic, age, address."
      );
      error.statusCode = 400;
      throw error;
    }

    const patient = await patientService.createPatient(req.body);
    res.status(201).json({ data: patient });
  } catch (error) {
    next(error);
  }
}

async function updateAgesAutomatically(req, res, next) {
  try {
    const result = await patientService.autoUpdateAges();
    res.status(200).json({
      message: "Automatic age update completed.",
      data: result
    });
  } catch (error) {
    next(error);
  }
}

async function requestAddressChange(req, res, next) {
  try {
    const { patientId } = req.params;
    const { newAddress, reason } = req.body;

    if (!newAddress) {
      const error = new Error("newAddress is required.");
      error.statusCode = 400;
      throw error;
    }

    const updatedPatient = await patientService.handleAddressChange(
      patientId,
      newAddress,
      reason
    );

    res.status(200).json({
      message: "Address change applied.",
      data: updatedPatient
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPatients,
  postPatient,
  updateAgesAutomatically,
  requestAddressChange
};
