class Appointment {
  constructor({ appointmentId, patientId, date, time, doctorName, status = "scheduled" }) {
    this.appointmentId = appointmentId;
    this.patientId = patientId;
    this.date = date;
    this.time = time;
    this.doctorName = doctorName;
    this.status = status;
  }
}

module.exports = { Appointment };
