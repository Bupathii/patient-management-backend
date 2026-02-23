# Patient Management Backend

Node.js + Express backend starter for the university take-home project.

## Project Scope
- Patient data management:
- Store patient ID, name, NIC, age, address, previous case history
- Function: update age automatically every year
- Function: handle address change request
- Appointment management:
- Store patient ID, date, time, doctor name
- Function: check doctor availability
- Function: cancel appointment

## Tech Stack
- Node.js
- Express.js
- MongoDB (connection ready)
- In-memory storage (temporary for current service logic)

## Quick Start
1. Install dependencies:
```bash
npm install
```
2. Copy env file:
```bash
copy .env.example .env
```
3. Set your MongoDB connection string in `.env`:
```env
MONGODB_URI=your_mongodb_connection_string
```
4. Run in development mode:
```bash
npm run dev
```

Server base URL: `http://localhost:3000`

## Folder Structure
```text
src/
  app.js
  server.js
  config/
    env.js
  controllers/
    patient.controller.js
    appointment.controller.js
  data/
    store.js
  middlewares/
    error.middleware.js
  models/
    patient.model.js
    appointment.model.js
  routes/
    patient.routes.js
    appointment.routes.js
  services/
    patient.service.js
    appointment.service.js
```

## Available Endpoints
- `GET /health` - health check
- `GET /api/patients` - list patients
- `POST /api/patients` - create patient
- `PATCH /api/patients/auto-update-ages` - TODO placeholder
- `PATCH /api/patients/:patientId/address-change` - TODO placeholder
- `GET /api/appointments` - list appointments
- `POST /api/appointments` - create appointment
- `GET /api/appointments/doctor-availability` - TODO placeholder
- `PATCH /api/appointments/:appointmentId/cancel` - TODO placeholder

## Branch Plan (Recommended)
1. `development` - base scaffold (this step)
2. `feature/auto-age-update`
3. `feature/address-change-request`
4. `feature/doctor-availability-check`
5. `feature/cancel-appointment`

## Notes
- Current storage is in-memory for fast iteration.
- Replace with a database layer later if needed.
- Validate all endpoints with Postman and keep screenshots for submission.
