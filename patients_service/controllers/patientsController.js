const Auth = require('../sdks/Auth');
const Validator = require('../utils/validator/validator');
const error = require('../utils/error');

class PatientsController {

    create(req, res) {
        // vaidate req.body
        const validation = new Validator();
        const roles = {
            fullName: ['string', 'min:3', 'max:100'],
            username: ['required', 'string', 'min:3', 'max:50'],
            password: ['required', 'string', 'min:6'],
            password_verify: ['required', 'match:password'],
            email: ['required', 'email'],
            website: ['url'],
            bio: ['string']
        };
        validation.make(req.body, roles).then((errors) => {
            if(errors) {
                return res.json(errors);
            }

            delete req.body.password_verify;
            req.body.type = 'patient';

            // use AuthSDK
            Auth.create(req.body).then(() => res.json({"status": "ok"}), (err) => {
                return res.json(error(new Error(err)));
            });
        });
    }

    find(req, res) {
        // use AuthSDK
        Auth.find(req.params.id).then((result) => {
            return res.json(result);
        }, (err) => {
            return res.json(error(new Error(err)));
        });
    }

    update(req, res) {
        // vaidate req.body
        const validation = new Validator();
        const roles = {
            username: ['required', 'string', 'min:3', 'max:50'],
            fullName: ['string', 'min:3', 'max:100'],
            password: ['required', 'string', 'min:6'],
            password_verify: ['required', 'match:password'],
            email: ['required', 'email'],
            website: ['url'],
            bio: ['string']
        };

        validation.make(req.body, roles).then((errors) => {
            if(errors) {
                return res.json(errors);
            }

            delete req.body.password_verify
            req.body.type = 'patient';

            // use AuthSDK
            Auth.update(req.params.id, req.body).then(() => res.json({"status": "ok"}), (error) => {
                return res.json(error(error));
            });
        });
    }

    delete(req, res) {
        // use AuthSDK
        Auth.delete(req.params.id).then(() => res.json({"status": "ok"}), (error) => {
            return res.json(error(error));
        });
    }
}

module.exports = new PatientsController();
