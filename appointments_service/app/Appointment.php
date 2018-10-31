<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'doctor_id', 'patient_id', 'from', 'to'
    ];
}
