const Appointment = require('../sdks/Appointment');
const Validator = require('../utils/validator/validator');
const error = require('../utils/error');

class AppointmentsController {

    list(req, res) {
        Appointment.patientList(req.user.id).then((apointments) => {
            if (!apointments) { apointments = []; }
            return res.json(apointments);
        }, (err) => {
            return res.json(error(new Error(err)));
        });
    }

    listAvailable(req, res) {
        Appointment.doctorAvailableList(req.params.id).then((apointments) => {
            return res.json(apointments);
        }, (err) => {
            return res.json(error(new Error(err)));
        });
    }

    make(req, res) {
        Appointment.makeAppointment(req.params.id, req.user.id).then((apointments) => {
            return res.json(apointments);
        }, (err) => {
            return res.json(error(new Error(err)));
        });
    }
}

module.exports = new AppointmentsController();
