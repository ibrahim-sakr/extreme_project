const Appointment = require('../sdks/Appointment');
const Validator = require('../utils/validator/validator');
const error = require('../utils/error');

class AppointmentsController {

    list(req, res) {
        Appointment.doctorList(req.user.id).then((apointments) => {
            return res.json(apointments);
        }, (err) => {
            return res.json(error(new Error(err)));
        });
    }

    create(req, res) {
        const roles = {
            patient_id: ['string'],
            from: ['required', 'date_format'], // YYYY-MM-DD
            to: ['required', 'date_format'] // YYYY-MM-DD
        };

        const validation = new Validator();
        validation.make(req.body, roles).then((errors) => {
            if(errors) {
                return res.json(errors);
            }

            Appointment.create(req.user.id, req.body).then((apointments) => {
                return res.json(apointments);
            }, (err) => {
                return res.json(error(new Error(err)));
            });
        });
    }

    update(req, res) {
        const roles = {
            patient_id: ['string'],
            from: ['required', 'date_format'], // YYYY-MM-DD
            to: ['required', 'date_format'] // YYYY-MM-DD
        };
 
        const validation = new Validator();
        validation.make(req.body, roles).then((errors) => {
            if(errors) {
                return res.json(errors);
            }

            Appointment.update(req.params.id, req.body).then((apointments) => {
                return res.json(apointments);
            }, (err) => {
                return res.json(error(new Error(err)));
            });
        });
    }

    delete(req, res) {
        Appointment.delete(req.params.id).then(() => {
            return res.json({status: 'ok'});
        }, (err) => {
            return res.json(error(new Error(err)));
        });
    }
}

module.exports = new AppointmentsController();
