const express = require("express");
const appointmentController = require("../controllers/appointment.controller");

const router = express.Router();

router.get("/", appointmentController.getAppointments);
router.post("/", appointmentController.postAppointment);

// Assignment function placeholders
router.get("/doctor-availability", appointmentController.checkDoctorAvailability);
router.patch("/:appointmentId/cancel", appointmentController.cancelAppointment);

module.exports = router;
