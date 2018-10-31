const fetch = require('node-fetch');
const config = require('config');

class AuthSDK {
    verify(token) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('auth.url')}:${config.get('auth.port')}/api/verify`,{
                method: 'POST',
                body: JSON.stringify({ token }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                    if (json && json.error) {
                        reject(json.error);
                    }
                    resolve(json.user);
                })
                .catch((error) => reject(error));
        });
    }

    token(obj) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('auth.url')}:${config.get('auth.port')}/api/token`,{
                method: 'POST',
                body: JSON.stringify({
                    type: obj.type,
                    username: obj.username,
                    password: obj.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                    if (json && json.error) {
                        reject(json.error);
                    }
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }

    create(obj) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('auth.url')}:${config.get('auth.port')}/api/user`,{
                method: 'POST',
                body:    JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                    if (json && json.error) {
                        reject(json.error);
                    }
                    resolve();
                });
        });
    }

    find(id) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('auth.url')}:${config.get('auth.port')}/api/user/${id}`,{
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    if (json && json.error) {
                        reject(json.error);
                    }
                    resolve(json);
                });
        });
    }

    update(id, obj) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('auth.url')}:${config.get('auth.port')}/api/user/${id}`,{
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                    if (json && json.error) {
                        reject(json.error);
                    }
                    resolve(json);
                });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('auth.url')}:${config.get('auth.port')}/api/user/${id}`,{
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(json => {
                    if (json && json.error) {
                        reject(json.error);
                    }
                    resolve();
                });
        });
    }
}

module.exports = new AuthSDK();
