const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, required: true, unique: true, trim: true },
    patientId: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, trim: true },
    doctorName: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["scheduled", "cancelled"],
      default: "scheduled"
    },
    cancelledAt: { type: Date, default: null }
  },
  { timestamps: true, versionKey: false }
);

appointmentSchema.index({
  doctorName: 1,
  date: 1,
  time: 1,
  status: 1
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { Appointment };
