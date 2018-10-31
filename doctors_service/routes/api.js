const express = require('express');
const DoctorsController = require('../controllers/doctorsController');
const AuthController = require('../controllers/authController');
const Authenticate = require('../middlewares/authenticate');
const AppointmentsController = require('../controllers/appointmentsController');

module.exports = (app) => {
    const api = new express.Router();

    // signin
    api.post('/signin', AuthController.signin);
    // register new doctor
    api.post('/doctor', DoctorsController.create);
    // get existing doctor
    api.get('/doctor/:id', Authenticate, DoctorsController.find);
    // update existing doctor
    api.put('/doctor/:id', Authenticate, DoctorsController.update);
    // delete doctor
    api.delete('/doctor/:id', Authenticate, DoctorsController.delete);

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
