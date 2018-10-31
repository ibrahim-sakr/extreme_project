const fetch = require('node-fetch');
const config = require('config');

class AppointmentSDK {
    doctorList(doctorId) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/doctor/${doctorId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(json => {
                resolve(json);
            })
            .catch((error) => reject(error));
        });
    }

    doctorAvailableList(doctorId) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/doctor/${doctorId}/available`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    if (json.error) {
                        reject(json);
                    }
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }

    patientList(patientId) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/patient/${patientId}`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    if (json.error) {
                        reject(json);
                    }
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }

    makeAppointment(appointmentId, patientId) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/${appointmentId}/${patientId}`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    if (json.error) {
                        reject(json);
                    }
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }

    create(doctorId, appointment) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/${doctorId}`, {
                method: 'POST',
                body: JSON.stringify(appointment),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }

    update(appointmentId, appointment) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/${appointmentId}`, {
                method: 'PUT',
                body: JSON.stringify(appointment),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(json => {
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }

    delete(appointmentId) {
        return new Promise((resolve, reject) => {
            fetch(`${config.get('appointment.url')}:${config.get('appointment.port')}/api/${appointmentId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(json => {
                    resolve(json);
                })
                .catch((error) => reject(error));
        });
    }
}

module.exports = new AppointmentSDK();
