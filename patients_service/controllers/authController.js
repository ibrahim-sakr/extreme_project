const Auth = require('../sdks/Auth');
const Validator = require('../utils/validator/validator');
const error = require('../utils/error');

class AuthController {
    signin(req, res) {
        //validate request
        const validation = new Validator();
        const roles = {
            username: ['required', 'string', 'min:3', 'max:50'],
            password: ['required', 'string', 'min:6'],
        };

        validation.make(req.body, roles).then((errors) => {
            if(errors) {
                return res.json(errors);
            }

            req.body.type = 'patient';

            // use Auth
            Auth.token(req.body).then((token) => {
                return res.json(token);
            }, (err) => {
                return res.json(error(new Error(err)));
            });
        });
    }
}

module.exports = new AuthController();
