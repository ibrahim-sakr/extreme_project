const express = require('express');
const PatientsController = require('../controllers/patientsController');
const AuthController = require('../controllers/authController');
const Authenticate = require('../middlewares/authenticate');
const AppointmentsController = require('../controllers/appointmentsController');

module.exports = (app) => {
    const api = new express.Router();

    // signin
    api.post('/signin', AuthController.signin);
    // register new patient
    api.post('/patient', PatientsController.create);
    // get existing patient
    api.get('/patient/:id', Authenticate, PatientsController.find);
    // update existing patient
    api.put('/patient/:id', Authenticate, PatientsController.update);
    // delete patient
    api.delete('/patient/:id', Authenticate, PatientsController.delete);

    // list his appointments
    api.get('/appointment', Authenticate, AppointmentsController.list);
    // list available appointments for a doctor
    api.get('/appointment/doctor/:id', Authenticate, AppointmentsController.listAvailable);
    // make appointment
    api.get('/appointment/:id', Authenticate, AppointmentsController.make);

    app.use('/api', api);
}
