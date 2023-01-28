<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate(['email' => 'mahmoud-kon@app.com'], [
            'name'      => 'Mahmoud Kon',
            'password'  => Hash::make(123),
        ]);

        User::updateOrCreate(['email' => 'user@app.com'], [
            'name'      => 'User Name',
            'password'  => Hash::make(123),
        ]);
    }
}
