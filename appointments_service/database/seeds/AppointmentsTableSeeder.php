<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('appointments')->insert([
            'doctor_id' => '',
            'patient_id' => '',
            'from' => '',
            'to' => '',
        ]);
    }
}