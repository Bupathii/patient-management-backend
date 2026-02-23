const { store } = require("../data/store");
const { Appointment } = require("../models/appointment.model");

function listAppointments() {
  return store.appointments;
}

function createAppointment(payload) {
  const appointment = new Appointment(payload);
  store.appointments.push(appointment);
  return appointment;
}

module.exports = {
  listAppointments,
  createAppointment
};
