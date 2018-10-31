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
    // create new appointment
    api.post('/appointment', Authenticate, AppointmentsController.create);
    // update appointment
    api.put('/appointment/:id', Authenticate, AppointmentsController.update);
    // delete appointment
    api.delete('/appointment/:id', Authenticate, AppointmentsController.delete);

    app.use('/api', api);
}
