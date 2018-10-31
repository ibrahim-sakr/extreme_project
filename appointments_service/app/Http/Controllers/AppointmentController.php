<?php

namespace App\Http\Controllers;

use App\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function __construct()
    {
        //
    }

    public function doctorList(string $doctorId): array
    {
        $appointments = Appointment::where('doctor_id', $doctorId)->get();

        return $appointments->toArray();
    }

    public function doctorAvailableList(string $doctorId): array
    {
        $appointments = Appointment::where('doctor_id', $doctorId)->where('patient_id', '')->get();

        return $appointments->toArray();
    }

    public function patientList(string $patientId): array
    {
        $appointments = Appointment::where('patient_id', $patientId)->get();

        return $appointments->toArray();
    }

    public function makeAppointment(string $appointmentId, string $patientId): ?Appointment
    {
        $appointments = Appointment::find($appointmentId);
        $appointments->patient_id = $patientId;

        if (!$appointments->save()) {
            return response('failed to make an appointment', 400);
        };

        return $appointments;
    }

    public function create(string $doctorId, Request $request)
    {
        $appointment = new Appointment;
        $appointment->doctor_id = $doctorId;
        $appointment->patient_id = $request->patient_id;
        $appointment->from_date = $request->from;
        $appointment->to_date = $request->to;

        if (!$appointment->save()) {
            return response('failed to make an appointment', 400);
        };

        return $appointment;
    }

    public function update(string $appointmentId, Request $request)
    {
        $appointments = Appointment::find($appointmentId);
        $appointments->patient_id = $request->patient_id;
        $appointments->from_date = $request->from;
        $appointments->to_date = $request->to;

        if (!$appointments->save()) {
            return response('failed to make an appointment', 400);
        };

        return $appointments->toArray();
    }

    public function delete(string $appointmentId)
    {
        $appointments = Appointment::find($appointmentId);

        if (!$appointments) {
            return response('Not Found.', 404);
        }
        if ($appointments->delete()) {
            return response()->json(['status' => 'ok']);
        } else {
            return response('failed to delete resource', 400);
        }
    }
}
