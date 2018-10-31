const AuthSDK = require('../sdks/Auth');
const error = require('../utils/error');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization || req.query.token;

    if (!authorization) {
        return res.json(error(new Error('unAuthed')));
    }

    const parsedAuthorization = authorization.split(' ');

    if (parsedAuthorization[0] !== 'Bearer') {
        return res.json(error(new Error('token is invalid')));
    }

    const verify = AuthSDK.verify(parsedAuthorization[1]);

    verify.then((user) => {
        req.user = user;
        next();
    }, (err) => {
        return res.json(error(new Error('token is invalid')));
    });
}
