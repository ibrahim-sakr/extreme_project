<?php

$router->group(['prefix' => 'api'], function () use ($router) {
    // doctor list
    $router->get('/doctor/{doctorId}', 'AppointmentController@doctorList');

    // doctor available list
    $router->get('/doctor/{doctorId}/available', 'AppointmentController@doctorAvailableList');

    // patient list
    $router->get('/patient/{patientId}', 'AppointmentController@patientList');

    // create
    $router->post('/{doctorId}', 'AppointmentController@create');

    // make an appointment
    $router->get('/{appointmentId}/{patientId}', 'AppointmentController@makeAppointment');

    // update
    $router->put('/{appointmentId}', 'AppointmentController@update');

    // delete
    $router->delete('/{appointmentId}', 'AppointmentController@delete');
});