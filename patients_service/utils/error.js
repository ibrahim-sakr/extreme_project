module.exports = (err) => {
    return {
        'type': 'error',
        'details': {
            'code': err.code,
            'message': err.message,
            'trace': err.trace
        }
    }
};
