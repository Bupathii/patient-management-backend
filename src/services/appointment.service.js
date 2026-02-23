const { Appointment } = require("../models/appointment.model");
const { Patient } = require("../models/patient.model");

function buildUtcDayRange(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    const error = new Error("Invalid date format. Use YYYY-MM-DD.");
    error.statusCode = 400;
    throw error;
  }

  const start = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
}

async function listAppointments() {
  return Appointment.find().sort({ createdAt: -1 });
}

async function createAppointment(payload) {
  const { patientId, doctorName, date, time } = payload;

  const patientExists = await Patient.exists({ patientId });
  if (!patientExists) {
    const error = new Error("Cannot create appointment: patientId does not exist.");
    error.statusCode = 400;
    throw error;
  }

  const { start, end } = buildUtcDayRange(date);

  const conflict = await Appointment.findOne({
    doctorName,
    time,
    status: "scheduled",
    date: { $gte: start, $lt: end }
  });

  if (conflict) {
    const error = new Error("Doctor is not available for this date and time.");
    error.statusCode = 409;
    throw error;
  }

  const appointmentPayload = {
    ...payload,
    date: start
  };

  return Appointment.create(appointmentPayload);
}

async function checkDoctorAvailability(doctorName, date, time) {
  const { start, end } = buildUtcDayRange(date);

  const existingAppointment = await Appointment.findOne({
    doctorName,
    time,
    status: "scheduled",
    date: { $gte: start, $lt: end }
  });

  return {
    doctorName,
    date: start.toISOString().slice(0, 10),
    time,
    available: !existingAppointment,
    conflictingAppointmentId: existingAppointment
      ? existingAppointment.appointmentId
      : null
  };
}

async function cancelAppointmentById(appointmentId) {
  const appointment = await Appointment.findOne({ appointmentId });

  if (!appointment) {
    const error = new Error("Appointment not found.");
    error.statusCode = 404;
    throw error;
  }

  if (appointment.status === "cancelled") {
    return appointment;
  }

  appointment.status = "cancelled";
  appointment.cancelledAt = new Date();
  await appointment.save();

  return appointment;
}

module.exports = {
  listAppointments,
  createAppointment,
  checkDoctorAvailability,
  cancelAppointmentById
};
