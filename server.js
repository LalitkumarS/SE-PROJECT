// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const moment = require('moment'); // Import moment.js for date formatting

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Patient schema
const patientSchema = new mongoose.Schema({
  patientname: String,
  patientId: String,
  password: String,
  dateOfBirth: Date,
  age: Number,
  dateOfAdmission: Date,
  roomNumber: String,
  causeOfDeath: String,
  dateOfDeath: Date,
});

// Patient model
const Patient = mongoose.model('Patient', patientSchema);

// API to register a patient
app.post('/register', async (req, res) => {
  try {
    const { password, name, patientId, dateOfBirth, age, dateOfAdmission, roomNumber, causeOfDeath, dateOfDeath } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient with all the fields
    const newPatient = new Patient({
      patientname,
      patientId,
      password: hashedPassword,
      dateOfBirth: new Date(dateOfBirth),
      age,
      dateOfAdmission: new Date(dateOfAdmission),
      roomNumber,
      causeOfDeath,
      dateOfDeath: new Date(dateOfDeath),
    });

    // Save the new patient record in the database
    await newPatient.save();

    res.status(201).send('Patient registered successfully');
  } catch (error) {
    console.error('Error saving patient:', error);
    res.status(500).send('Server error');
  }
});

// API to get all patients (with formatted dates and masked password)
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients

    // Format each patient object
    const formattedPatients = patients.map(patient => ({
      name: patient.name, // Display name
      patientId: patient.patientId,
      password: "*****", // Mask password
      dateOfBirth: moment(patient.dateOfBirth).format('YYYY-MM-DD'), // Format date
      age: patient.age,
      dateOfAdmission: moment(patient.dateOfAdmission).format('YYYY-MM-DD'), // Format date
      roomNumber: patient.roomNumber,
      causeOfDeath: patient.causeOfDeath,
      dateOfDeath: moment(patient.dateOfDeath).format('YYYY-MM-DD'), // Format date
    }));

    res.status(200).json(formattedPatients); // Send formatted patients as JSON
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
