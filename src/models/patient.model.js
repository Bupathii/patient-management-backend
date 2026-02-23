class Patient {
  constructor({ patientId, name, nic, age, address, previousCaseHistory = [] }) {
    this.patientId = patientId;
    this.name = name;
    this.nic = nic;
    this.age = age;
    this.address = address;
    this.previousCaseHistory = previousCaseHistory;
  }
}

module.exports = { Patient };
