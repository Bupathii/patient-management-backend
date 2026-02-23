const express = require("express");
const patientController = require("../controllers/patient.controller");

const router = express.Router();

router.get("/", patientController.getPatients);
router.post("/", patientController.postPatient);

// Assignment function placeholders
router.patch("/auto-update-ages", patientController.updateAgesAutomatically);
router.patch("/:patientId/address-change", patientController.requestAddressChange);

module.exports = router;
