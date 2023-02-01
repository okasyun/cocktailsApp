<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=> '岡本',
            'email'=> 'sample@gmail.com',
            'password'=> 'okashun1207',
            // 'age'=> 37,
            // 'profile_image_path'=> 'sample.png',
        ]);
    }
}
