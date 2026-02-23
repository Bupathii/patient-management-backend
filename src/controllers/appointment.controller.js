const appointmentService = require("../services/appointment.service");

async function getAppointments(req, res, next) {
  try {
    const appointments = await appointmentService.listAppointments();
    res.status(200).json({ data: appointments });
  } catch (error) {
    next(error);
  }
}

async function postAppointment(req, res, next) {
  try {
    const { appointmentId, patientId, date, time, doctorName } = req.body;

    if (!appointmentId || !patientId || !date || !time || !doctorName) {
      const error = new Error(
        "Required fields: appointmentId, patientId, date, time, doctorName."
      );
      error.statusCode = 400;
      throw error;
    }

    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json({ data: appointment });
  } catch (error) {
    next(error);
  }
}

async function checkDoctorAvailability(req, res, next) {
  try {
    const { doctorName, date, time } = req.query;

    if (!doctorName || !date || !time) {
      const error = new Error(
        "Query params required: doctorName, date, time."
      );
      error.statusCode = 400;
      throw error;
    }

    const availability = await appointmentService.checkDoctorAvailability(
      doctorName,
      date,
      time
    );

    res.status(200).json({ data: availability });
  } catch (error) {
    next(error);
  }
}

async function cancelAppointment(req, res, next) {
  try {
    const { appointmentId } = req.params;

    const appointment = await appointmentService.cancelAppointmentById(
      appointmentId
    );

    res.status(200).json({
      message: "Appointment cancelled.",
      data: appointment
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAppointments,
  postAppointment,
  checkDoctorAvailability,
  cancelAppointment
};
