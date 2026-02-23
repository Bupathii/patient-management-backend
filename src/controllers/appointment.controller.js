const appointmentService = require("../services/appointment.service");

function getAppointments(req, res) {
  const appointments = appointmentService.listAppointments();
  res.status(200).json({ data: appointments });
}

function postAppointment(req, res) {
  const appointment = appointmentService.createAppointment(req.body);
  res.status(201).json({ data: appointment });
}

function checkDoctorAvailability(req, res) {
  res.status(501).json({
    message: "TODO: Implement doctor availability check function."
  });
}

function cancelAppointment(req, res) {
  res.status(501).json({
    message: "TODO: Implement appointment cancellation function."
  });
}

module.exports = {
  getAppointments,
  postAppointment,
  checkDoctorAvailability,
  cancelAppointment
};
